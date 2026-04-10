import express from "express";
import axios from "axios";
import { saveUserAndTracks } from "../database/statements";

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

router.get("/login", (req, res) => {
  const scope = "user-top-read playlist-modify-private user-read-private";

  const authURL =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
    });

  console.log("Login route hit");
  console.log("Redirecting to Spotify auth URL");

  res.redirect(authURL);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  console.log("Callback hit");
  console.log("Code:", code);

  try {
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

    console.log("Token exchange worked");

    const access_token = tokenResponse.data.access_token;

    const spotifyUser = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("User fetch worked");

    const user = {
      id: spotifyUser.data.id,
      display_name: spotifyUser.data.display_name,
    };

    const topTracks = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("Top tracks fetch worked");

    const tracks = topTracks.data.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
    }));

    const userId = await saveUserAndTracks(user, tracks);
    console.log("Save worked");
    console.log("DB user id:", userId);

    console.log("Redirecting to frontend");

    res.redirect(
      `${FRONTEND_URL}/hostorjoin?access_token=${encodeURIComponent(access_token)}&userId=${userId}`
    );
  } catch (error: any) {
    console.error("CALLBACK ERROR:");
    console.error(error.response?.data || error.message);
    res.status(500).send("Error getting data");
  }
});

export default router;