import { useEffect, useState } from "react";

function Dashboard() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tracksParam = params.get("tracks");

    if (tracksParam) {
      setTracks(JSON.parse(decodeURIComponent(tracksParam)));
    }
  }, []);

  const handleGeneratePlaylist = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");

      if (!accessToken) {
        alert("No access token found. Please log in again.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/spotify/generate-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      alert("Playlist created!");
    } catch (error) {
      console.error("BUTTON ERROR:", error);
      alert("Something broke. Check console.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <button onClick={handleGeneratePlaylist}>
        Generate Playlist
      </button>
    </div>
  );
}

export default Dashboard;