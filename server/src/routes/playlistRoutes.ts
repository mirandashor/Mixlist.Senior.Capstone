import express from "express";
import axios from "axios";
import { getTracksForSession } from "../database/statements";

const router = express.Router();

router.post("/generate-playlist", async (req, res) => {
  try {
    const { accessToken, roomCode } = req.body;

    // (prevents crashes)
    if (!accessToken) {
      return res.status(400).json({ error: "Missing access token" });
    }

    if (!roomCode) {
     return res.status(400).json({ error: "Missing roomCode" });
    }

    console.log("TOKEN RECEIVED:", accessToken);

    // 1. Get current user
    const meRes = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userId = meRes.data.id;
    console.log("USER ID:", userId);

// 1. Get all track IDs from session
const trackIds = await getTracksForSession(roomCode);

console.log("TRACK IDS FROM DB:", trackIds.length);

// 2. Score tracks (count duplicates)
const trackScores: Record<string, number> = {};

for (const id of trackIds) {
  trackScores[id] = (trackScores[id] || 0) + 1;
}

// 3. Sort by score (highest first)
const sortedTracks = Object.entries(trackScores)
  .sort((a, b) => b[1] - a[1])
  .map(([id]) => id);

console.log("SORTED TRACKS:", sortedTracks.length);

// 4. Convert to Spotify URIs
const uris = sortedTracks.map(id => `spotify:track:${id}`);

    console.log("TRACK COUNT:", uris.length);

    // 3. Create playlist
    const playlistRes = await axios.post(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: "My Generated Playlist",
        description: "Built from my top tracks",
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const playlistId = playlistRes.data.id;
    console.log("PLAYLIST CREATED:", playlistId);

    // 4. Add tracks
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/items`,
      {
        uris: uris,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("TRACKS ADDED");

    res.json({
      message: "Playlist created!",
      playlistId,
    });

  } catch (err: any) {
    console.error("PLAYLIST ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to create playlist",
      details: err.response?.data || err.message,
    });
  }
});

export default router;