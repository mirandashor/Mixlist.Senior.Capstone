import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [playlistId, setPlaylistId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("playlistId");

    if (!id) {
      navigate("/");
      return;
    }

    setPlaylistId(id);
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      {playlistId && (
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          width="100%"
          height="380"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default Dashboard;