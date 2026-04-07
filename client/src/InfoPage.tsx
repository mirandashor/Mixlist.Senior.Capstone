import "./info.css";
import logo from "./assets/logo.png";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const InfoPage = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
    return (
        <div className="info-page">
            <nav className="navbar">
                <a href="/" className="logo">
                    <img src={logo} alt="Mixlist logo" />
                    <span>Mixlist</span>
                </a>

                <div className="nav-buttons">
                    <a href="/info#how-it-works">How it works</a>
                    <a href="/info#faq">FAQ</a>
                    <a href="/info#about">About Us</a>
                    <a href="/info#support">Support</a>
                </div>
            </nav>

            <section id="how-it-works" className="info-section">
                <div className="info-content">
                    <h1>How It Works</h1>
                    <p>
                        Create or join a Mixlist session, enter a room code, and build a
                        group playlist based on everyone’s music taste.
                    </p>
                </div>
            </section>

            <section id="faq" className="info-section alt">
                <div className="info-content">
                    <h1>FAQ</h1>
                    <p>
                        Learn how sessions work, how users join, and how group playlist
                        generation is handled.
                    </p>
                </div>
            </section>

            <section id="about" className="info-section">
                <div className="info-content">
                    <h1>About Us</h1>
                    <p>
                        Mixlist is a collaborative music app designed to make group playlist
                        creation easier, smarter, and more fun.
                    </p>
                </div>
            </section>

            <section id="support" className="info-section alt">
                <div className="info-content">
                    <h1>Support</h1>
                    <p>
                        Need help with joining a room, hosting a session, or navigating the
                        site? Mixlist support is here to help users get back into the music.
                    </p>
                </div>
            </section>


        </div>
    );
};

export default InfoPage;