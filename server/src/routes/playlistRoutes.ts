import express from "express";
import axios from "axios";
import { getArtistTags } from "../services/lastfmService";

const router = express.Router();

router.post("/generate-playlist", async (req, res) => {
  try {
    const { accessToken, genre } = req.body;

    console.log("Selected genre:", genre);

    if (!accessToken) {
      return res.status(400).json({ error: "Missing access token" });
    }

    console.log("TOKEN RECEIVED:", accessToken);

    const meRes = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userId = meRes.data.id;
    console.log("USER ID:", userId);

    const topTracksRes = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=20",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

const tracks = topTracksRes.data.items;

const filteredTracks = [];

for (let track of tracks) {
  const artist = track.artists[0].name;

  const tags = await getArtistTags(artist);

  const tagNames = tags.map((t: any) => t.name.toLowerCase());

  const isMatch =
    !genre || genre.length === 0
      ? true
      : genre.some((g: string) =>
          tagNames.some(tag =>
            tag.includes(g.toLowerCase())
          )
        );

  if (isMatch) {
    filteredTracks.push(track);
  }
}

console.log("Original track count:", tracks.length);
console.log("Filtered track count:", filteredTracks.length);

const uris = filteredTracks.map((track: any) => track.uri);

const playlistName =
  genre && genre.length > 0
    ? `${genre.join(" & ")} Mixlist`
    : "Mixlist Playlist";

    const playlistRes = await axios.post(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: playlistName,
        description: "Built for the people in the room",
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