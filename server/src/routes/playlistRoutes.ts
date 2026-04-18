import express from "express";
import axios from "axios";
import { getArtistTags } from "../services/lastfmService";

const router = express.Router();
const { getTracksForSession } = require("../database/statements");
const { getSessionUsers } = require("../database/statements");
const { clearSessionData } = require("../database/statements");

//smart playlist will always be at least 40 tracks
const targetLength = 40;

router.post("/generate-playlist", async (req, res) => {
  try {
    const { accessToken, roomCode, genre, includeSmart, includeTopHits } = req.body;

    //  build playlist name from genres
    const playlistName =
      genre && genre.length > 0
        ? `${genre.join(" & ")} Mixlist`
        : "Mixlist";

    //  Get users for description
    const sessionData = await getSessionUsers(roomCode);
    const names = sessionData.users.map((u: any) => u.display_name);

    // 5 names max
    const shortNames = names.slice(0, 5);

    //  Build description
    const description = `Built by ${shortNames.join(" & ")} -- Make your own mixlist at https://mixlist.onrender.com/`;

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

//fetch top track IDs from roomCode db table
const tracks = await getTracksForSession(roomCode);

console.log("TRACKS FROM DB:", tracks.length);

// score tracks (count duplicates)
const trackScores: Record<string, number> = {};

//genre extraction
for (const track of tracks) {
  const artist = track.artist_name;

  const tags = await getArtistTags(artist);
  const tagNames = tags.map((t: any) => t.name.toLowerCase());

//genre filtering
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

// high score first
const sortedTracks = Object.keys(grouped)
  .sort((a, b) => Number(b) - Number(a))
  .flatMap(score => grouped[Number(score)]);

let finalTrackIds = [...sortedTracks];

//genre filtering logic
const shouldFill = includeSmart || includeTopHits;

if (includeSmart && shouldFill && finalTrackIds.length < targetLength) {
  console.log("ADDING SMART RECOMMENDATIONS...");

  const needed = targetLength - finalTrackIds.length;

  // get unique artists from session
  const uniqueArtists = [
    ...new Set(tracks.map((t: any) => t.artist_name))
  ];

  for (const artist of uniqueArtists) {

    //if playlist isnt 40 tracks force more tracks
    if (shouldFill && finalTrackIds.length >= targetLength) break;

    try {
      const res = await axios.get(
        "https://api.spotify.com/v1/search",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: `${artist} ${genre?.join(" ") || ""}`,
            type: "track",
            limit: 3,
          },
        }
      );

      const songs = res.data.tracks?.items || [];

      //only include recommendations that are of the specified genre
      for (const song of songs) {

        const tags = await getArtistTags(song.artists[0]?.name);
        const tagNames = tags.map((t: any) => t.name.toLowerCase());

        const matchesGenre =
          !genre || genre.length === 0
            ? true
            : tagNames.some((tag: any) =>
                genre.some((g: string) =>
                  tag.includes(g.toLowerCase()) ||
                  g.toLowerCase().includes(tag)
                )
              );
        
        //allow genre straying given playlist still isnt 40 tracks
        if (!matchesGenre && Math.random() > 0.4) continue;

        if (shouldFill && finalTrackIds.length >= targetLength) break;

        if (song.type !== "track") continue;

        if (!finalTrackIds.includes(song.id)) {
          finalTrackIds.push(song.id);
        }
      }
    } catch (err) {
      console.error("artist rec error:", err);
    }
  }
}

// popular rec's logic
if (includeTopHits && shouldFill) {
  console.log("ADDING TOP HITS...");

  try {
    const res = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: genre?.join(" ") || "",
          type: "track",
          limit: 10,
        },
      }
    );

    let songs = res.data.tracks?.items || [];

    // sort by popularity (highest first)
    songs = songs.sort((a: any, b: any) => b.popularity - a.popularity);

    for (const song of songs) {
      if (song.type !== "track") continue;

      if (!finalTrackIds.includes(song.id)) {
        finalTrackIds.push(song.id);
      }
    }

  } catch (err) {
    console.error("top hits error:", err);
  }
}


// Fallback logic for a playlist that isnt 40 tracks with options toggled, additional smart recs added
if (includeSmart && shouldFill && finalTrackIds.length < targetLength) {
  console.log("FALLBACK RECOMMENDATIONS...");

  const uniqueArtists = [
    ...new Set(tracks.map((t: any) => t.artist_name))
  ];

  for (const artist of uniqueArtists) {
    if (finalTrackIds.length >= targetLength) break;

    try {
      const res = await axios.get(
        "https://api.spotify.com/v1/search",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: artist,
            type: "track",
            limit: 3,
          },
        }
      );

      const songs = res.data.tracks?.items || [];

      for (const song of songs) {
        if (finalTrackIds.length >= targetLength) break;

        if (song.type !== "track") continue;

        if (!finalTrackIds.includes(song.id)) {
          finalTrackIds.push(song.id);
        }
      }
    } catch (err) {
      console.error("fallback error:", err);
    }
  }
}

// convert to Spotify URIs & shuffle
const shuffleFinal = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

shuffleFinal(finalTrackIds);

const finalUris = finalTrackIds.map(id => `spotify:track:${id}`);

    console.log("TRACK COUNT:", finalUris.length);

    // create playlist
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

    //playlist state for listener redirect
    (globalThis as any).generatedPlaylists =
      (globalThis as any).generatedPlaylists || {};

    (globalThis as any).generatedPlaylists[roomCode] = playlistId;

    console.log("Playlist Created:", playlistId);

    // add tracks to spotify playlist
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/items`,
      {
        uris: finalUris,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Tracks added");

    //clear session data so users can make many mixlists
setTimeout(() => {
  clearSessionData();
}, 2000);

    //info grabbing for listener dashboard
    res.json({
      message: "Playlist created",
      playlistId: playlistId,
      playlistName: playlistName,
      users: shortNames
    });

  } catch (err: any) {
    console.error("PLAYLIST ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Failed to create playlist",
      details: err.response?.data || err.message,
    });
  }
});

// poll for playlist readiness
router.get("/status/:roomCode", (req, res) => {
  const { roomCode } = req.params;

  const playlistId =
    (globalThis as any).generatedPlaylists?.[roomCode];

  if (!playlistId) {
    return res.json({ ready: false });
  }

  res.json({
    ready: true,
    playlistId
  });
});

export default router;