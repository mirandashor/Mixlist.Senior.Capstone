import { useNavigate, Link } from "react-router-dom";
import "./hostorjoin.css";
import logo from "./assets/logo.png";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const HostOrJoin: React.FC = () => {
    const navigate = useNavigate();

//get logged in user id from URL after spotify auth callback
const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");
const accessToken = params.get("access_token");

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

        const accessToken = params.get("access_token");

        navigate(
            `/host?roomCode=${data.roomCode}&role=host&userId=${userId}&access_token=${accessToken}`
        );
    } catch (err) {
        console.error("error creating session:", err);
        alert("server error");
    }
};
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

        <main className="hostjoin-page-wrapper">
            <section className="hostjoin-hero-section">
                <div className="hostjoin-hero-text">
                    <h1>Choose how you want to join the mix</h1>
                    <p>
                        Start a session or jump into one with a room code.
                        Mixlist makes group playlist creation simple.
                    </p>
                </div>
            </section>

            <section className="hostjoin-dashboard-container">
                {/* button sends you to join page */}
                <button
                    className="hostjoin-big-btn"
                     onClick={() =>
                        navigate(`/join?userId=${userId}&access_token=${accessToken}`)
                }
                >
                    🎧 Join a Mixlist
                </button>
                {/* button sends you to host page */}
                <button
                    className="hostjoin-big-btn"
                    onClick={handleHost}
                    >🎶 Host a Mixlist
                </button>

                <div className="hostjoin-info-box">
                    <strong>Join a Mixlist</strong>
                    <br />
                    Enter a room code to join an active session and add your
                    taste profile to the Mix in seconds.
                </div>

                <div className="hostjoin-info-box">
                    <strong>Host a Mixlist</strong>
                    <br />
                    Create a session, invite others, and build a playlist
                    together from one shared space.
                </div>
            </section>

             <section className="hostjoin-how-section">
          <h2>How it works</h2>

          <div className="hostjoin-steps">
            <div className="hostjoin-step">
              <h3>1. Create or Join</h3>
              <p>Start a session or enter a room code.</p>
            </div>

            <div className="hostjoin-step">
              <h3>2. Add your taste</h3>
              <p>Connect your music preferences.</p>
            </div>

            <div className="hostjoin-step">
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
          </div>
        </div>
      </footer>
    </>
  );
};

export default HostOrJoin;