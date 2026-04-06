import express from "express";
import axios from "axios";

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = "http://localhost:5000/auth/callback";

// STEP 1: LOGIN
router.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email playlist-modify-public";

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  res.redirect(authUrl);
});

// STEP 2: CALLBACK
router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

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

    const accessToken = tokenResponse.data.access_token;

    // 🔥 THIS IS THE IMPORTANT PART
    res.redirect(
      `http://localhost:5173/dashboard?access_token=${accessToken}`
    );

  } catch (error) {
    console.error(error);
    res.send("Error logging in");
  }
});

export default router;