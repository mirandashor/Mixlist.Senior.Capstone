import { useNavigate, Link } from "react-router-dom";
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
          <Link to="/" className="logo">
              <img src={logo} alt="Mixlist logo" />
              <span>Mixlist</span>
          </Link>

          <div className="nav-links">
              <Link to="/info#how-it-works">How it works</Link>
              <Link to="/info#faq">FAQ</Link>
              <Link to="/info#about">About Us</Link>
              <Link to="/info#support">Support</Link>
          </div>
      </nav>

      <main className="dashboard-page-wrapper">
        <section className="dashboard-hero">
          <div className="dashboard-badge-row">
            <button className="dashboard-back-btn" onClick={() => navigate("/hostorjoin")}>
              ← Create A New Session
            </button>
            <span className="dashboard-hero-badge">Generated Playlist</span>
          </div>

          <div className="dashboard-hero-text">
            <h1>Your Mixlist is ready</h1>
            <p>
              Your playlist has been generated based on the group’s music taste.
            </p>
            <p>
              View it below or open it in Spotify.
            </p>
          </div>
        </section>

        <section className="dashboard-playlist-card">
          <div className="dashboard-playlist-header">
            <div className="dashboard-playlist-header-text">
              <h2>{playlistName}</h2>
              <p className="dashboard-playlist-meta">Created for {creatorName}</p>
            </div>

            <div className="dashboard-playlist-actions">
              <a
                href={playlistEmbedUrl.replace("/embed", "")}
                target="_blank"
                rel="noreferrer"
                className="dashboard-spotify-btn"
              >
                Open in Spotify
              </a>

            </div>
          </div>

          <div className="dashboard-spotify-embed-wrap">
            <iframe
              title="Spotify Playlist"
              src={playlistEmbedUrl}
              width="100%"
              height="720"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <section className="dashboard-info-section">
          <div className="dashboard-info-card">
            <h3>Preview the playlist</h3>
            <p>
              View the playlist on Mixlist's website, or open it on Spotify.
            </p>
          </div>

          <div className="dashboard-info-card">
            <h3>Save and share</h3>
            <p>
              Save it to spotify, share it via the link, and keep your Mix forever.
            </p>
          </div>

          <div className="dashboard-info-card">
            <h3>Make another mix</h3>
            <p>
              Want a different result? Go back and generate a new
              playlist with different settings.
            </p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 Mixlist. All rights reserved.</p>

          <div className="footer-links">
            <a href="/#about">Privacy</a>
            <a href="/#about">Terms</a>
            <a href="/#about">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;