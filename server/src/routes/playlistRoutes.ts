import express from "express";
import axios from "axios";
import { getArtistTags } from "../services/lastfmService";

const router = express.Router();
const { getTracksForSession } = require("../database/statements");
const { getSessionUsers } = require("../database/statements");

router.post("/generate-playlist", async (req, res) => {
  try {
    const { accessToken, roomCode, genre } = req.body;

    //  Build playlist name from genres
    const playlistName =
      genre && genre.length > 0
        ? `${genre.join(" & ")} Mixlist`
        : "Mixlist";

    //  Get users for description
    const sessionData = await getSessionUsers(roomCode);
    const names = sessionData.users.map((u: any) => u.display_name);

    // limit to 4 names max
    const shortNames = names.slice(0, 4);

    //  Build description
    const description = `Built by ${shortNames.join(", ")} 🎶 https://mixlist-senior-capstone.onrender.com`;

    // (prevents crashes)
    if (!accessToken) {
      return res.status(400).json({ error: "Missing access token" });
    }

    if (!roomCode) {
     return res.status(400).json({ error: "Missing roomCode" });
    }

    console.log("TOKEN RECEIVED:", accessToken);

    // Get current user
    const meRes = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userId = meRes.data.id;
    console.log("USER ID:", userId);

// 1. Get all track IDs from session
const tracks = await getTracksForSession(roomCode);

console.log("TRACKS FROM DB:", tracks.length);

// Score tracks (count duplicates)
const trackScores: Record<string, number> = {};

for (const track of tracks) {
  const artist = track.artist_name;

  const tags = await getArtistTags(artist);
  const tagNames = tags.map((t: any) => t.name.toLowerCase());

const isMatch =
  !genre || genre.length === 0
    ? true
    : tagNames.some((tag: any) =>
        genre.some((g: string) => {
          const t = tag.toLowerCase();
          const gLower = g.toLowerCase();
          return t.includes(gLower) || gLower.includes(t);
        })
      );

  if (isMatch) {
    const id = track.spotify_track_id;
    trackScores[id] = (trackScores[id] || 0) + 1;
  }
}

// group by score
const grouped: Record<number, string[]> = {};

for (const [id, score] of Object.entries(trackScores)) {
  if (!grouped[score]) grouped[score] = [];
  grouped[score].push(id);
}

// shuffle each group
const shuffle = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

Object.values(grouped).forEach(shuffle);

// flatten groups (high score first)
const sortedTracks = Object.keys(grouped)
  .sort((a, b) => Number(b) - Number(a))
  .flatMap(score => grouped[Number(score)]);

// 4. convert to Spotify URIs
const uris = sortedTracks.map(id => `spotify:track:${id}`);

    console.log("TRACK COUNT:", uris.length);

    // Create playlist
    const playlistRes = await axios.post(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: playlistName,
        description: description,
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

    // Add tracks
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
      playlistId: playlistId
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