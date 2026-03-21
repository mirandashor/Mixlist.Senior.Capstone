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

      <h2>Your Top Tracks:</h2>

      {tracks.length === 0 ? (
        <p>No data yet — log in to Spotify</p>
      ) : (
        <ul>
          {tracks.map((track, index) => (
            <li key={index}>
              {track.name} - {track.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;