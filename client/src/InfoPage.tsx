import "./info.css";
import logo from "./assets/logo.png";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

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

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="info-section">
        <div className="info-content">
          <h1>How It Works</h1>

          <p>
            <strong>Mixlist</strong> makes music selection collaborative. By combining multiple users’ taste profiles,
            it creates a shared playlist that reflects the group as a whole.
          </p>

          <p>
            To begin, <strong>log in</strong> with your Spotify account. Mixlist only accesses
            your public profile to utilize your display name and listening preferences such
            as your top tracks and artists.
          </p>

          <p>
            After logging in, you can choose to either host a Mixlist or join an existing
            session.
          </p>

          <p>
            If you <strong>host</strong> a Mixlist, you will be shown a room code to share, 
            and the ability to
            choose your genre preferences. You can choose as many as you want, but at least one 
            must be selected.
          </p>

          <ul className="info-list">
            <li>
              <strong>Default Mix:</strong> Uses only user top tracks filtered
              by selected genres.
            </li>
            <li>
              <strong>Smart Recommendations:</strong> Fills in extra space in the playlist using
              similar songs based on the users top tracks and the chosen genres.
            </li>
            <li>
              <strong>Popular Songs:</strong>  Fills in extra space in the playlist with current
              trending tracks on Spotify.
            </li>
          </ul>

          <p>
            <i>The Mixlist Playlist will consist of 40 songs total. Using the Default 
                Mix can result in fewer songs depending on genre selection.</i>
          </p>

          <p>
            If you <strong>join</strong> a Mixlist, enter the room code provided by the host.
            You will be placed in a waiting room where you can see other users,
            but only the host controls playlist settings.
          </p>

          <p>
            Once the host <strong>creates</strong> the playlist, all users are directed to the
            dashboard where they can listen, share, and save the playlist to Spotify.
          </p>

          <p>
            Not satisfied with the result? Start a new session and generate another Mixlist.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="info-section alt">
        <div className="info-content">
          <h1>FAQ</h1>

          <div className="faq-item">
            <h3>Do I need a Spotify account?</h3>
            <p>
              Yes. Spotify login is required so Mixlist can access your listening data.
            </p>
          </div>

          <div className="faq-item">
            <h3>What data does Mixlist use?</h3>
            <p>
              Only public profile information, display name, and listening preferences.
            </p>
          </div>

          <div className="faq-item">
            <h3>Can guests change playlist settings?</h3>
            <p>
              No. Only the host controls genre filters and playlist options.
            </p>
          </div>

          <div className="faq-item">
            <h3>Can I save the playlist?</h3>
            <p>
              Yes. You can open and save the playlist directly in Spotify after it is created.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="info-section alt">
        <section id="team" className="section">
          <h2 className="section-title">Meet the Team</h2>

          <div className="team-grid">

            <div className="card">
              <h3>Miranda Secaur</h3>
              <p>Major: Information Technology</p>
              <p>Backend</p>
              <p>mirandasecaur@gmail.com</p>
            </div>

            <div className="card">
              <h3>Miranda Shoraji</h3>
              <p>Major: Computer Science</p>
              <p>Backend</p>
              <p>mirandashoraji@gmail.com</p>
            </div>

            <div className="card">
              <h3>Judy Nashwati</h3>
              <p>Major: Computer Science</p>
              <p>Frontend</p>
              <p>jnashwati@gmail.com</p>
            </div>

            <div className="card">
              <h3>Mariam Yassa</h3>
              <p>Major: Computer Science</p>
              <p>Frontend</p>
              <p>myassa5345@gmail.com</p>
            </div>

          </div>
        </section>
      </section>

      {/* SUPPORT */}
      <section id="support" className="info-section alt">
        <div className="info-content">
          <h1>Support</h1>
          <p>
            Need help joining a room, hosting a session, or using the site?
            Mixlist support is available to assist.
          </p>
          <p>
            Contact a team member by email with a short description of your issue.
          </p>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;