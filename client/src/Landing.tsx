//landing page
import React from "react";
import "./landing.css";

const Landing: React.FC = () => {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
    };

    return (
        //nav bar
        <>
        <nav className="navbar">
            <div className="logo">🎵 Mixlist</div>

            <div className="nav-buttons">
                <button>How it works</button>
                <button>FAQ</button>
                <button>About Us</button>
                <button>Support</button>
            </div>
        </nav>

        <div className="hero-wrapper">
            <section className="hero">
                <div className="hero-content">
                    <h1>Mixlist</h1>
                    <p>
                        A real-time playlist generator, built for the people in the room.
                    </p>
                    {/* login button */}
                    <button className="spotify-btn" onClick={handleLogin}> 
                        Log in with Spotify
                    </button>
                </div>
            </section>
        </div>

        <div className="footer">
            © 2026 Mixlist
        </div>
        </>
    );
};

export default Landing;