import { useNavigate } from "react-router-dom";
import "./join.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/hostorjoin");
  };


  return (
    <>
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={logo} alt="Mixlist logo" />
          <span>Mixlist</span>
        </a>

        <div className="nav-buttons">
          <Link to="/info#how-it-works">How it works</Link>
          <Link to="/info#faq">FAQ</Link>
          <Link to="/info#about">About Us</Link>
          <Link to="/info#support">Support</Link>
        </div>
      </nav>


      <main className="page-wrapper">
        <section className="join-hero">
          <div className="join-hero-text">
            <span className="hero-badge">Join a live session</span>
            <h1>Jump into the mix</h1>
            <p>
              Enter a room code to join an active MixList
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