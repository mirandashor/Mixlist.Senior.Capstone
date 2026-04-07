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
        spotify_track_id TEXT UNIQUE,
        track_name  TEXT,
        artist_name TEXT,
        rank INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE (user_id, spotify_track_id)
        )
        `);
    db.run(`DELETE FROM top_tracks`);
    db.run(`DELETE FROM users`);
    console.log("Database cleared on startup");
});
//insert the user and their top tracks into the database dynamically
function saveUserAndTracks(user, tracks) {
    db.run(
        //insert the info using their spotify ID and display name
        `INSERT OR IGNORE INTO users (spotify_user_id, display_name)
        VALUES (?, ?)`,
        [user.id, user.display_name],
        function(err) {
            if (err) return console.error(err);

            let userId = this.lastID

            if (!userId) {
                db.get(
                    `SELECT id FROM users WHERE spotify_user_id = ?`,
                    [user.id],
                    (err, row) => {
                        insertTracks(row.id, tracks);
                    }
                );
            } else{ 
                insertTracks(userId, tracks);
            }
            }
    );
}

//insert a users top tracks into a database using the user ID
//from the user table to get their spotify data
function insertTracks(userId, tracks) {
    tracks.forEach((track, index) => {
        db.run(
            `INSERT OR IGNORE INTO top_tracks
            (user_id, spotify_track_id, track_name, artist_name, rank)
            VALUES (?, ?, ?, ?, ?)`,
            [userId, track.id, track.name, track.artist, index]
        );
    });
    console.log("Top Tracks Saved!")

 // DEBUG: check how many tracks exist in Render DB
    db.get("SELECT COUNT(*) AS count FROM top_tracks", (err, row) => {
        if (err) {
            console.error("COUNT ERROR:", err.message);
        } else {
            console.log("TRACK COUNT:", row.count);
        }
    });
}

//delete the data in the database after a session ends
function clearSessionData() {
    db.run(`DELETE FROM top_tracks`);
    db.run(`DELETE FROM users`);
    console.log("Session data cleared");
}

module.exports = {
    saveUserAndTracks,
    clearSessionData,
};