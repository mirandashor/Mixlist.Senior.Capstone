import { useNavigate } from "react-router-dom";
import "./join.css";

const Join = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/hostorjoin");
  };

  const handleScanQR = () => {
    navigate("/hostorjoin");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🎵</span>
          <span>Mixlist</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#flow">How it works</a>
          <a href="/#features">FAQ</a>
          <a href="/#about">Support</a>
        </div>
      </nav>

      <main className="page-wrapper">
        <section className="join-hero">
          <div className="join-hero-text">
            <span className="hero-badge">Join a live session</span>
            <h1>Jump into the mix</h1>
            <p>
              Enter a room code or scan a QR code to join an active Mixlist
              and add your music taste to the room.
            </p>
          </div>
        </section>

        <section className="join-card">
          <h2>Join a Mixlist</h2>
          <p className="join-subtext">
            Ready to add your taste to the playlist?
          </p>

          <form className="join-form">
            <div className="input-row">
              <input
                type="text"
                placeholder="Enter room code"
                className="room-input"
              />

              <button type="button" className="join-btn" onClick={handleJoin}>
                Join
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <button type="button" className="qr-btn" onClick={handleScanQR}>
              📷 Scan QR Code
            </button>
          </form>
        </section>

        <section className="info-section">
          <div className="info-card">
            <h3>Quick Join</h3>
            <p>Enter the room code from your host and join in seconds.</p>
          </div>

          <div className="info-card">
            <h3>QR Option</h3>
            <p>Scan a QR code if the host has one available for the session.</p>
          </div>

          <div className="info-card">
            <h3>Live Playlist</h3>
            <p>
              Once you are in, your preferences can help shape the mix in real
              time.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Join;