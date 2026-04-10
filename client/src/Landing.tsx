import React from "react";
import "./landing.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
    };


    return (
        <div className="page">
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Mixlist logo" />
                    <span>Mixlist</span>
                </div>

                <div className="nav-buttons">
                    <Link to="/info#how-it-works">How it works</Link>
                    <Link to="/info#faq">FAQ</Link>
                    <Link to="/info#about">About Us</Link>
                    <Link to="/info#support">Support</Link>
                </div>
            </nav>

            <main className="main-content">
                <section className="hero-section">
                    <div className="hero-text">
                        <span className="hero-badge">Collaborative Playlist Generation</span>
                        <h1>Build the perfect playlist with everyone in the room</h1>
                        <p>
                            Mixlist helps groups create playlists together using tailored preferences from your favorites,
                            so the music actually matches the vibe.
                        </p>

                        <div className="hero-actions">
                            <button className="spotify-btn" onClick={handleLogin}>
                                Log in with Spotify
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="stat-card">
                                <h3>Fast setup</h3>
                                <p>Create a session and get people joining in seconds.</p>
                            </div>
                            <div className="stat-card">
                                <h3>Group-based</h3>
                                <p>Built for parties, study groups, hangouts, and events.</p>
                            </div>
                            <div className="stat-card">
                                <h3>Spotify powered</h3>
                                <p>Use real music taste data to generate better playlists.</p>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="image-card"></div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="section-heading">
                        <span>Why Mixlist</span>
                        <h2>Made for shared music moments</h2>
                        <p>
                            Instead of one person controlling the aux, Mixlist gives everyone a say
                            while still keeping the playlist coherent.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Create a session</h3>
                            <p>Start a room instantly and invite others to join your mix.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Blend preferences</h3>
                            <p>Combine everyone’s music taste into one playlist that feels balanced.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Keep the vibe going</h3>
                            <p>Generate new playlists as more people join the session.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>© 2026 Mixlist. Built for better group listening.</p>
            </footer>
        </div>
    );
};

export default Landing;