import express from "express";
const router = express.Router();

//import create, join, and get users functions from database file to use
const { createSession, joinSession, getSessionUsers } = require("../database/statements.js");

//HOST (create) - POST route (req = incoming data, res = outgoing)
router.post("/create", async (req, res) => {
    //try = try to run code safely, catch fail later)
    try {
        //get user id from incoming request (host)
        //req.body = data sent to POST body (button, form, etc) (host id, room code,user id)
        const { hostUserId } = req.body;

        //if host id doesnt exist, stop & error
        if (!hostUserId) {
            return res.status(400).json({ error: "hostUserId is required" });
        }

        //call db function. await = wait until finishes to call.
        //function generates session & room code, and add host to session by user id
        const result = await createSession(hostUserId);

        //send result back to frontend
        res.json(result);

    } catch (err) {
        //console log if error 
        console.error("create session error:", err);

        //send error response
        res.status(500).json({ error: "failed to create session" });
    }
});

//JOIN - POST route to join an existing session
//run incoming request, outgoing response, and await allows to not run early
//post route to join a room /api/session/join
//JOIN - POST route to join an existing session
//run incoming request, outgoing response, and await allows to not run early
//post route to join a room /api/session/join
router.post("/join", async (req,res) => {
    try {
        //get the existign session values from the request body
        const { roomCode, userId } = req.body;

        //error if no room code
        if (!roomCode) {
            return res.status(400).json({ error: "roomCode is required" });
        }
        //error if no user id
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        //call db function. joinSession finds the room and user
        //result = returned object
        const result = await joinSession(roomCode, userId);
        //send result back to frontend 
        res.json(result); 

    } catch (err: any) {
        console.error("join session error:", err);

        //room no longer open to join
        if (err.message === "Session not found") {
            return res.status(404).json({ error: "Session not found" });
        }
        //server error
        if (err.message === "Session is locked") {
            return res.status(400).json({ error: "Session is locked" });
        }
        //fallback error
        res.status(500).json({ error: "failed to join session" });
    }
});

//GET route to return all users in a session
//use room code from the url to find the room and its users
///api/session/(code)/users. dynamic roomCode url parameter
router.get("/:roomCode/users", async (req, res) => {
    try {
        //get room code from the URL parameter
        //req.params = data inside url
        const { roomCode } = req.params;

        //no room code error
        if (!roomCode) {
            return res.status(400).json({ error: "room code required" });
        }

        //call db function to get all users in the session & send results back as JSON
        const result = await getSessionUsers(roomCode);
        res.json(result);

    } catch (err: any) {
        console.error("get session users error:", err);
            //room code doesnt exist
            if (err.message === "session not found") {
                return res.status(404).json({ error: "session not found" });
            }
            res.status(500).json({ error: "failed to get session users" });
    }
});

export default router;