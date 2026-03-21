import express from "express";
import axios from "axios";

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

console.log("CLIENT_ID:", CLIENT_ID);
console.log("CLIENT_SECRET:", CLIENT_SECRET);

const REDIRECT_URI = "http://127.0.0.1:5000/auth/callback";



router.get("/login", (req, res) => {
  const scope = "user-top-read";

  const authURL =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
    });

  res.redirect(authURL);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    // access token
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const access_token = tokenResponse.data.access_token;

    // users top tracks
    const topTracks = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

const tracks = topTracks.data.items.map((track: any) => ({
  name: track.name,
  artist: track.artists[0].name
}));

// redirect to frontend with data
res.redirect(
  `http://localhost:5173/?tracks=${encodeURIComponent(JSON.stringify(tracks))}`
);

  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error getting data");
  }
});

export default router;