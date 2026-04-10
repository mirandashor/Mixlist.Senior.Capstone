import { useNavigate } from "react-router-dom";
import "./hostorjoin.css";
import logo from "./assets/logo.png";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const HostOrJoin: React.FC = () => {
    const navigate = useNavigate();

//get logged in user id from URL after spotify auth callback
const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

//host button creates a session then navigates to join button
const handleHost = async () => {
    try {
        if(!userId) {
            alert("no logged in user found");
            return;
        }
        //host user id is set to the host room to create session with them
        const res = await fetch(`${apiBaseUrl}/api/session/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostUserId: Number(userId),
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "failed to create session");
            return;
        }

        navigate(`/host?roomCode=${data.roomCode}&role=host&userId=${userId}`);
    } catch (err) {
        console.error("error creating session:", err);
        alert("server error");
    }
};
    return (
        <>
        <nav className="navbar">
            <a href="/" className="logo">
                <img src={logo} alt="Mixlist logo" />
                <span>Mixlist</span>
            </a>

            <div className="nav-links">
                <a href="/#flow">How it works</a>
                <a href="/#features">FAQ</a>
                <a href="/#about">About Us</a>
                <a href="/#support">Support</a>
            </div>
        </nav>

        <main className="page-wrapper">
            <section className="hero-section">
                <div className="hero-text">
                    <h1>Choose how you want to join the mix</h1>
                    <p>
                        Start a session or jump into one with a room code.
                        Mixlist makes group playlist creation simple.
                    </p>
                </div>
            </section>

            <section className="dashboard-container">
                {/* button sends you to join page */}
                <button
                    className="big-btn"
                    onClick={() => navigate(`/join?userId=${userId}`)}
                    >🎧 Join a Mixlist
                </button>
                {/* button sends you to host page */}
                <button
                    className="big-btn"
                    onClick={handleHost}
                    >🎶 Host a Mixlist
                </button>

                <div className="info-box">
                    <strong>Join a Mixlist</strong>
                    <br />
                    <br />
                    Enter a room code to join an active session and add your
                    taste profile to the Mix in seconds.
                </div>

                <div className="info-box">
                    <strong>Host a Mixlist</strong>
                    <br />
                    <br />
                    Create a session, invite others, and build a playlist
                    together from one shared space.
                </div>
            </section>

             <section className="how-section">
          <h2>How it works</h2>

          <div className="steps">
            <div className="step">
              <h3>1. Create or Join</h3>
              <p>Start a session or enter a room code.</p>
            </div>

            <div className="step">
              <h3>2. Add your taste</h3>
              <p>Connect your music preferences.</p>
            </div>

            <div className="step">
              <h3>3. Get your mix</h3>
              <p>We generate a playlist for everyone.</p>
            </div>
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

export default HostOrJoin;