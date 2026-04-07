import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./hostorjoin.css";
import logo from "./assets/logo.png";

const HostOrJoin: React.FC = () => {
    const navigate = useNavigate();

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
                    <button
                        className="big-btn"
                        onClick={() => navigate("/join")}
                    >
                        🎧 Join a Mixlist
                    </button>

                    <button
                        className="big-btn"
                        onClick={() => navigate("/host")}
                    >
                        🎶 Host a Mixlist
                    </button>

                    <div className="info-box">
                        <strong>Join a Mixlist</strong>
                        <br />
                        <br />
                        Enter a room code to join an active session and add your
                        taste profile to the mix in seconds.
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