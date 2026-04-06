import React from "react";
import "./style.css";

const Landing = () => {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Mixlist</div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#team">Team</a>
          <a href="#flow">Flow</a>

          {/* ✅ FIXED LOGIN */}
          <a href="http://localhost:5000/auth/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-layout">
          <div className="hero-card">
            <div className="hero-badge">
              Collaborative Music Discovery
            </div>

            <h1>Build the perfect playlist for every room.</h1>

            <p>
              Mixlist is a collaborative playlist generator that blends multiple
              users’ listening preferences to create a shared music experience.
            </p>

            <div className="hero-buttons">
              {/* ✅ FIXED BUTTON */}
              <button
                className="primary-btn"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:5000/auth/login")
                }
              >
                Get Started
              </button>

              <a
                href="https://github.com/mirandashor/Mixlist-Senior-Capstone"
                target="_blank"
                className="github-btn"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="hero-side">
            <div className="side-card">
              <h3>What it does</h3>
              <p>
                Combines group listening preferences into one shared playlist.
              </p>
            </div>

            <div className="side-card">
              <h3>Best for</h3>
              <p>Parties, cafés, road trips, study groups.</p>
            </div>

            <div className="side-card">
              <h3>Core idea</h3>
              <p>Make music selection collaborative.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;