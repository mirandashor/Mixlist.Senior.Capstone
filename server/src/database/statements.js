const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.db");
console.log("DB PATH:", dbPath);
const db = new sqlite3.Database(dbPath);

db.serialize(() => { //run in order
    //user table - user details from spotify
    // user id (autoincrements so each user has a new id for table
    // spotify id, spotify display name
    db.run(`
        CREATE TABLE IF NOT EXISTS users 
        (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        spotify_user_id TEXT UNIQUE,
        display_name TEXT        
        )
        `);
    //top tracks table - users top tracks from spotify API
    // track id for table (autoincremenets)
    // user id = id for each user in user table
    // spotify track id, track name, artist name, rank (placement)
    db.run(`
        CREATE TABLE IF NOT EXISTS top_tracks
        (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        spotify_track_id TEXT,
        track_name  TEXT,
        artist_name TEXT,
        rank INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE (user_id, spotify_track_id)
        )
        `);

    //sessions table - host page, create sessions based on unique room codes
    //session_room id, unique room code, host user id from clicking host
    //status text - waiting to all users locked in
    db.run(`
        CREATE TABLE IF NOT EXISTS session_room (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_code TEXT UNIQUE,
        host_user_id INTEGER,
        status TEXT DEFAULT 'waiting'
        )    
        `);
    //table to hold the users in a session - later used to create playlist
    //session_users id, reference session_room id and user id from session_room table and user table
    //to hold the correct users from spotify id users in the correct room
    //UNIQUE = user cannot be added to the same session twice
    //session can still have many users and user can have many sessions. not 1:1 unique
    db.run(`
        CREATE TABLE IF NOT EXISTS session_users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_room_id INTEGER,
        user_id INTEGER,
        UNIQUE(session_room_id, user_id),
        FOREIGN KEY (session_room_id) REFERENCES session_room(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `);

    //delete data when the server is restarted. no user data saved
    //eventually change to be cleared when session ends
    db.run(`DELETE FROM session_users`);
    db.run(`DELETE FROM session_room`);
    db.run(`DELETE FROM top_tracks`);
    db.run(`DELETE FROM users`);
    console.log("Database cleared on startup");
});

//save the user into the user table database dynamically
function saveUserAndTracks(user, tracks) {
    db.run(
        //insert the info using their spotify ID and display name
        `INSERT OR IGNORE INTO users (spotify_user_id, display_name)
        VALUES (?, ?)`,
        [user.id, user.display_name],
        function(err) {
            if (err) return console.error(err);

            let userId = this.lastID;

            if (!userId) {
                db.get(
                    `SELECT id FROM users WHERE spotify_user_id = ?`,
                    [user.id],
                    (err, row) => {
                        if (err) return console.error(err);
                        insertTracks(row.id, tracks);
                    }
                );
            } else { 
                insertTracks(userId, tracks);
            }
        }
    );
}

//insert a users top tracks into top_tracks table in database 
//using the user ID from the user table to get their spotify data
function insertTracks(userId, tracks) {
    tracks.forEach((track, index) => {
        db.run(
            `INSERT OR IGNORE INTO top_tracks
            (user_id, spotify_track_id, track_name, artist_name, rank)
            VALUES (?, ?, ?, ?, ?)`,
            [userId, track.id, track.name, track.artist, index]
        );
    });
    console.log("Top Tracks Saved!");
    

    // DEBUG: show what is actually in the database in render
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) console.error("USERS ERROR:", err);
        else console.log("USERS:", rows);
    });

    db.all(`SELECT * FROM top_tracks`, [], (err, rows) => {
        if (err) console.error("TRACKS ERROR:", err);
        else console.log("TRACKS:", rows);
    });
}

//generate a random room code
function generateRoomCode(length = 4) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //available characters for poss room code
    let code = ""; //start w empty string

    for (let i = 0; i < length; i++) { //run loop for length of code (4)
        code += chars[Math.floor(Math.random() * chars.length)]; 
        //code = chars = picks a random letter using the math code by.. 
        //math.random = random number 0-1
        //* chars.length = scale to sizing of string
        //math.floor = whole number index
    }
    return code;
}

//create a session, generate the room code
//save info to the database, add host to the session, return the result
function createSession(hostUserId) {
    //resolve = success, reject = error
    return new Promise((resolve, reject) => {
        const roomCode = generateRoomCode();

        //save room code, host user id from user table, room status
        db.run(
            `INSERT INTO session_room 
            (room_code, host_user_id, status)
            VALUES (?, ?, 'waiting')`,
            [roomCode, hostUserId],
            //check for error & stop if any
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                //get session ID
                const sessionId = this.lastID;

                //save users into a session
                db.run(
                    `INSERT INTO session_users
                    (session_room_id, user_id)
                    VALUES (?, ?)`,
                    [sessionId, hostUserId],
                    function (err2) {
                        if (err2) {
                            reject(err2);
                            return;
                        }
                        resolve({ sessionId, roomCode });
                    }
                );
            }
        );
    });
}

//delete the data in the database after a session ends
function clearSessionData() {
    db.run(`DELETE FROM session_users`);
    db.run(`DELETE FROM session_room`);
    db.run(`DELETE FROM top_tracks`);
    db.run(`DELETE FROM users`);
    console.log("Session data cleared");
}

module.exports = {
    saveUserAndTracks,
    createSession,
    clearSessionData,
};