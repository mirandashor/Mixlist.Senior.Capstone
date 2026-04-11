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
    return new Promise((resolve, reject) => {
        db.run(
            //insert the info using their spotify ID and display name
            `INSERT OR IGNORE INTO users (spotify_user_id, display_name)
            VALUES (?, ?)`,
            [user.id, user.display_name],
            function(err) {
                if (err) {
                    reject(err);
                    return;
                }

                let userId = this.lastID;

                //if user already existed, get their existing database id
                if (!userId) {
                    db.get(
                        `SELECT id FROM users WHERE spotify_user_id = ?`,
                        [user.id],
                        (err, row) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            if (!row) {
                                reject(new Error("user not found after save"));
                                return;
                            }

                            userId = row.id;
                            insertTracks(userId, tracks);
                            resolve(userId);
                        }
                    );
                } else {
                    insertTracks(userId, tracks);
                    resolve(userId);
                }
            }
        );
    });
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

//users join an existing session
//find session by room code, then add the user to that session table
function joinSession(roomCode, userId) {
    //success or error
    return new Promise((resolve, reject) => {
        //find the row in the db for the session that matches the inputted room code
        //db.get = get one row, db.all = get many row, db.run = insert/update/delete
        db.get(
            //look in session_room table, find the row where room_code matches the input one
            //select room code row from session_room where it matches the room code
            `SELECT * FROM session_room WHERE room_code = ?`,
            [roomCode],
            //db error
            function(err, session) {
                if (err) {
                    reject(err);
                    return;
                }
                //room code error
                if (!session) {
                    reject(new Error("session not found"));
                    return;
                }
                //session room no longer open. (playlist generated)
                if (session.status !== "waiting") {
                    reject(new Error("session is locked"));
                    return;
                }

                //add the user into session_users table
                //insert session room id = found from room code, and user id = joining user
                db.run(
                    `INSERT INTO session_users
                    (session_room_id, user_id)
                    VALUES (?, ?)`,
                    [session.id, userId],

                    function (err2) {
                        //stop if insert fails (e.g. user tries joining twice)
                        if (err2) {
                            reject(err2);
                            return;
                        }
                        //return the session info as structured json if join works
                        resolve({
                            sessionId: session.id,
                            roomCode: session.room_code,
                            userId: userId
                        });
                    }
                );
            }
        );
    });
}
//GET session users. using room code, get all users and display them
//by finding the session by room code
//to see all users in the session for frontend and back
//find this room code then put all users inside it 
function getSessionUsers(roomCode) {
    return new Promise((resolve, reject) => {
        //find the session that matches the inputted room code from session_room table
        db.get(
            `SELECT * FROM session_room WHERE room_code = ?`,
            [roomCode],
            function (err, session) {
                //db error
                if (err) {
                    reject(err);
                    return;
                }
                //room code error
                if (!session) {
                    reject(new Error("session not found"));
                    return;
                }

                //get all db info on users linked to that session
                //from session_users table, match the user_id to the users table
                //keep only rows where session_room_id matches this room
                //return user info
                db.all(
                    `SELECT users.id, users.spotify_user_id, users.display_name
                     FROM session_users
                     JOIN users ON session_users.user_id = users.id
                     WHERE session_users.session_room_id = ?`,
                    [session.id],
                    function (err2, users) {
                        //query error
                        if (err2) {
                            reject(err2);
                            return;
                        }
                        //return session info and the users in it 
                        resolve({
                            sessionId: session.id,
                            roomCode: session.room_code,
                            users: users
                        });
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

//user handling

function getTracksForSession(roomCode) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM session_room WHERE room_code = ?`,
            [roomCode],
            (err, session) => {
                if (err) return reject(err);
                if (!session) return reject(new Error("Session not found"));

                db.all(
                    `SELECT top_tracks.spotify_track_id
                     FROM session_users
                     JOIN top_tracks ON session_users.user_id = top_tracks.user_id
                     WHERE session_users.session_room_id = ?`,
                    [session.id],
                    (err2, rows) => {
                        if (err2) return reject(err2);

                        const trackIds = rows.map(r => r.spotify_track_id);
                        resolve(trackIds);
                    }
                );
            }
        );
    });
}


module.exports = {
    saveUserAndTracks,
    createSession,
    joinSession,
    getSessionUsers,
    clearSessionData,
    getTracksForSession
};