"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.post("/generate-playlist", async (req, res) => {
    try {
        const { accessToken } = req.body;
        // (prevents crashes)
        if (!accessToken) {
            return res.status(400).json({ error: "Missing access token" });
        }
        console.log("TOKEN RECEIVED:", accessToken);
        // 1. Get current user
        const meRes = await axios_1.default.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userId = meRes.data.id;
        console.log("USER ID:", userId);
        // 2. Get top tracks
        const topTracksRes = await axios_1.default.get("https://api.spotify.com/v1/me/top/tracks?limit=20", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const uris = topTracksRes.data.items.map((track) => track.uri);
        console.log("TRACK COUNT:", uris.length);
        // 3. Create playlist
        const playlistRes = await axios_1.default.post("https://api.spotify.com/v1/me/playlists", {
            name: "My Generated Playlist",
            description: "Built from my top tracks",
            public: false,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const playlistId = playlistRes.data.id;
        console.log("PLAYLIST CREATED:", playlistId);
        // 4. Add tracks
        await axios_1.default.post(`https://api.spotify.com/v1/playlists/${playlistId}/items`, {
            uris: uris,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        console.log("TRACKS ADDED");
        res.json({
            message: "Playlist created!",
            playlistId,
        });
    }
    catch (err) {
        console.error("PLAYLIST ERROR:", err.response?.data || err.message);
        res.status(500).json({
            error: "Failed to create playlist",
            details: err.response?.data || err.message,
        });
    }
});
exports.default = router;
