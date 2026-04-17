import React from "react";
import "./landing.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
    const handleLogin = () => {
         window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
    };


    return (
        <div className="landing-page">
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

            <main className="landing-main-content">
                <section className="landing-hero-section">
                    <div className="landing-hero-text">
                        <h1>Build the perfect playlist with everyone in the room</h1>
                        <p>
                            Mixlist helps groups create playlists together using tailored preferences from your favorites,
                            so the music actually matches the vibe.
                        </p>

                        <div className="landing-hero-actions">
                            <button className="landing-spotify-btn" onClick={handleLogin}>
                                Login With Spotify to Get Started
                            </button> 
                        </div>

                        <div className="landing-hero-stats">
                            <div className="landing-stat-card">
                                <h3>🚀 Fast setup</h3>
                                <p>Create a session and get people joining in seconds.</p>
                            </div>
                            <div className="landing-stat-card">
                                <h3>👥 Group-based</h3>
                                <p>Built for parties, study groups, hangouts, and events.</p>
                            </div>
                            <div className="landing-stat-card">
                                <h3>🎧 Spotify powered</h3>
                                <p>Use real music taste data to generate better playlists.</p>
                            </div>
                        </div>
                    </div>

                    <div className="landing-hero-visual">
                        <div className="landing-image-card"></div>
                    </div>
                </section>

                <section className="landing-features-section">
                    <div className="landing-section-heading">
                        <span>Why Mixlist</span>
                        <h2>Made for shared music moments</h2>
                        <p>
                            Instead of one person controlling the aux, Mixlist gives everyone a say
                            while still keeping the playlist coherent.
                        </p>
                    </div>

                    <div className="landing-features-grid">
                        <div className="landing-feature-card">
                            <h3>Create a session</h3>
                            <p>Start a room instantly and invite others to join your mix.</p>
                        </div>
                        <div className="landing-feature-card">
                            <h3>Blend preferences</h3>
                            <p>Combine everyone’s music taste into one playlist that feels balanced.</p>
                        </div>
                        <div className="landing-feature-card">
                            <h3>Keep the vibe going</h3>
                            <p>Generate new playlists as more people join the session.</p>
                        </div>
                    </div>
                </section>

                <section className="learn-more-section">
  <h2>Learn More</h2>
  <p className="learn-subtext">
    Explore more about Mixlist and how it works
  </p>

  <div className="learn-links">
    <a href="https://github.com/mirandashor/Mixlist-Senior-Capstone.git" target="_blank" rel="noreferrer">
      <span>💻</span> GitHub
    </a>

    <a href="https://mirandashor.github.io/Mixlist-Senior-Capstone/" target="_blank" rel="noreferrer">
      <span>🌐</span> Website
    </a>

    <a href="https://your-poster-link.com" target="_blank" rel="noreferrer">
      <span>📝</span> Poster
    </a>

    <a href="https://youtube.com/your-video" target="_blank" rel="noreferrer">
      <span>🎥</span> Demo Video
    </a>
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

      
        </div>
    );
};

export default Landing;