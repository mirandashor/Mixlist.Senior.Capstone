import { useNavigate } from "react-router-dom";
import "./host.css";

const Host = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
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
        <section className="host-hero">
          <div className="host-hero-text">
            <span className="hero-badge">Start your own session</span>
            <h1>Set the mood for the room</h1>
            <p>
              Start a new Mixlist by choosing the vibe, genre, or mood you want.
              Once your session is created, you can invite others to join and
              build the mix together.
            </p>
          </div>
        </section>

        <section className="host-card">
          <h2>Host a Mixlist</h2>
          <p className="host-subtext">
            Pick the mood and start the session.
          </p>

          <form className="host-form">
            <div className="input-row">
              <input
                type="text"
                placeholder="Mix your mood"
                className="mood-input"
              />

              <button
                type="button"
                className="create-btn"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>

            <div className="host-message">
              Be the blueprint, then invite others to mix the rest.
            </div>
          </form>
        </section>

        <section className="info-section">
          <div className="info-card">
            <h3>Choose the Vibe</h3>
            <p>
              Set the tone with a genre, mood, or overall sound for the room.
            </p>
          </div>

          <div className="info-card">
            <h3>Create the Session</h3>
            <p>
              Launch your Mixlist and make it ready for others to join.
            </p>
          </div>

          <div className="info-card">
            <h3>Invite Others</h3>
            <p>
              Share the room code or QR code so everyone can add their taste.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Host;