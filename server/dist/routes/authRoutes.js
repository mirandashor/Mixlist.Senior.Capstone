"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const statements_1 = require("../database/statements");
const router = express_1.default.Router();
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:5000/auth/callback";
router.get("/login", (req, res) => {
    const scope = "user-top-read playlist-modify-private user-read-private";
    const authURL = "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
        });
    res.redirect(authURL);
});
router.get("/callback", async (req, res) => {
    const code = req.query.code;
    try {
        const tokenResponse = await axios_1.default.post("https://accounts.spotify.com/api/token", new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const access_token = tokenResponse.data.access_token;
        // get user info (user ID and display name - no private info)
        const spotifyUser = await axios_1.default.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const user = {
            id: spotifyUser.data.id,
            display_name: spotifyUser.data.display_name
        };
        // get users top tracks
        const topTracks = await axios_1.default.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const tracks = topTracks.data.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name
        }));
        (0, statements_1.saveUserAndTracks)(user, tracks);
        // redirect to frontend with data
        res.redirect(`http://localhost:5173/?access_token=${encodeURIComponent(access_token)}&tracks=${encodeURIComponent(JSON.stringify(tracks))}`);
    }
    catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send("Error getting data");
    }
});
exports.default = router;
