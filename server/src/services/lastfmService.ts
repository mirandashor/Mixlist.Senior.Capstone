import axios from "axios";

const API_KEY = process.env.LASTFM_API_KEY;

export async function getArtistTags(artistName: string) {
  try {
    const res = await axios.get("http://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "artist.gettoptags",
        artist: artistName,
        api_key: API_KEY, // 👈 THIS MUST EXIST
        format: "json"
      }
    });

    return res.data.toptags?.tag || [];
  } catch (err: any) {
    console.error("Last.fm error:", err.response?.data || err.message);
    return [];
  }
}