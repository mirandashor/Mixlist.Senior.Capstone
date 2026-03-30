import { useEffect, useState } from "react";

function App() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tracksParam = params.get("tracks");

    if (tracksParam) {
      setTracks(JSON.parse(decodeURIComponent(tracksParam)));
    }
  }, []);

  

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/login";
  };

  const handleGeneratePlaylist = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");

      console.log("TOKEN:", accessToken);

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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Mixlist</h1>

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Login with Spotify
      </button>

          <div>
            
      <button onClick={handleGeneratePlaylist}>
        Generate Playlist
      </button>

    </div>
    </div>
  );

}

export default App;