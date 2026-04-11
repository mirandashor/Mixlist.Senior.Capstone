import express from "express";
import axios from "axios";
import { getTracksForSession } from "../database/statements";
import { getArtistTags } from "../services/lastfmService";

const router = express.Router();

router.post("/generate-playlist", async (req, res) => {
  try {
    const { accessToken, roomCode, genre } = req.body;

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
const tracks = await getTracksForSession(roomCode);

console.log("TRACKS FROM DB:", tracks.length);

// 2. Score tracks (count duplicates)
const trackScores: Record<string, number> = {};

for (const track of tracks) {
  const artist = track.artist_name;

  const tags = await getArtistTags(artist);
  const tagNames = tags.map((t: any) => t.name.toLowerCase());

const isMatch =
  !genre || genre.length === 0
    ? true
    : tagNames.some(tag =>
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

// sort by score
const sortedTracks = Object.entries(trackScores)
  .sort((a, b) => b[1] - a[1])
  .map(([id]) => id);

// 4. convert to Spotify URIs
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