import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import logo from "./assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  // replace these later with real backend values
  const playlistName = "Rock Mixlist";
  const creatorName = "Miranda";
  const playlistEmbedUrl =
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M";

  return (
    <>
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={logo} alt="Mixlist logo" />
          <span>Mixlist</span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#flow">How it works</a>
          <a href="/#features">FAQ</a>
          <a href="/#about">About Us</a>
          <a href="/#support">Support</a>
        </div>
      </nav>

      <main className="page-wrapper">
        <section className="dashboard-hero">
          <div className="badge-row">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <span className="hero-badge">Playlist ready</span>
          </div>

          <div className="dashboard-hero-text">
            <h1>Your Mixlist is ready</h1>
            <p>
              Your playlist has been generated based on the group’s music taste.
              Preview it below and open it in Spotify.
            </p>
          </div>
        </section>

        <section className="playlist-card">
          <div className="playlist-header">
            <div className="playlist-header-text">
              <p className="playlist-label">Generated playlist</p>
              <h2>{playlistName}</h2>
              <p className="playlist-meta">Created for {creatorName}</p>
            </div>

            <div className="playlist-actions">
              <a
                href={playlistEmbedUrl.replace("/embed", "")}
                target="_blank"
                rel="noreferrer"
                className="spotify-btn"
              >
                Open in Spotify
              </a>

              <button
                className="secondary-btn"
                onClick={() => navigate("/host")}
              >
                Back to session
              </button>
            </div>
          </div>

          <div className="spotify-embed-wrap">
            <iframe
              title="Spotify Playlist"
              src={playlistEmbedUrl}
              width="100%"
              height="460"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <section className="dashboard-info-section">
          <div className="info-card">
            <h3>Preview the playlist</h3>
            <p>
              Scroll through the songs and make sure the playlist fits your
              group’s vibe.
            </p>
          </div>

          <div className="info-card">
            <h3>Save and share</h3>
            <p>
              Open the playlist in Spotify to save it, share it, or send it to
              everyone in the session.
            </p>
          </div>

          <div className="info-card">
            <h3>Make another mix</h3>
            <p>
              Want a different result? Go back to the session and generate a new
              playlist with different settings.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;