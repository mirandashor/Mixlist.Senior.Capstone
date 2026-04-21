import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./hostorjoin.css";
import logo from "./assets/logo.png";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const HostOrJoin: React.FC = () => {
    const navigate = useNavigate();

//get logged in user id from URL 
//store logged in user in local storage for multi-use
//if nothing in the URL from auth anymore (backed up from playlist gen),
//get data stored in the browser (temp)
const [storedUserId, setStoredUserId] = useState<string | null>(null);
const [storedToken, setStoredToken] = useState<string | null>(null);

useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const userIdFromUrl = params.get("userId"); //db user id
    const tokenFromUrl = params.get("access_token"); //spotify token

    if (userIdFromUrl && tokenFromUrl) {
        // ALWAYS overwrite with fresh DB values when login
        localStorage.setItem("userId", userIdFromUrl);
        localStorage.setItem("accessToken", tokenFromUrl);
        //update state for use inn app
        setStoredUserId(userIdFromUrl);
        setStoredToken(tokenFromUrl);
        //new URL without query params
        window.history.replaceState({}, document.title, "/hostorjoin");
    } else {
        //fallback to load saved user from browser 
        const savedUserId = localStorage.getItem("userId");
        const savedToken = localStorage.getItem("accessToken");

        setStoredUserId(savedUserId);
        setStoredToken(savedToken);
    }
}, []);

//host button creates a session then navigates to join button
const handleHost = async () => {
    
    try {
        if(!storedUserId) {
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
                hostUserId: Number(storedUserId),
            }),
        });

const data = await res.json();

if (!res.ok) {
    alert(data.error || "failed to create session");
    return;
}


// await fetch(`${apiBaseUrl}/api/session/join`, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         roomCode: data.roomCode,
//         userId: Number(storedUserId),
//     }),
// });

const accessToken = storedToken;

navigate(
    `/host?roomCode=${data.roomCode}&role=host&userId=${storedUserId}&access_token=${accessToken}`
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
                        navigate(`/join?userId=${storedUserId}&access_token=${storedToken}`)
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
        </div>
      </footer>
    </>
  );
};

export default HostOrJoin;