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

                <div className="info-nav-links">
                    <Link to="/info#how-it-works">How it works</Link>
                    <Link to="/info#faq">FAQ</Link>
                    <Link to="/info#about">About Us</Link>
                    <Link to="/info#support">Support</Link>
                    <Link to="/info#bts">Extra</Link>
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
              I am an Information Technology student with a focus in Artificial Intelligence at Oakland University. 
              I have a strong foundation in software development, cloud technologies, and data-driven applications, 
              with hands-on experience building full-stack systems using tools like React, Node.js, and cloud platforms. 
              As a core contributor to Mixlist, my main role was designing and developing the logic behind the collaborative 
              playlist tool, including implementing the algorithm and weighted recommendation system.
              <p>Contact: mirandasecaur@gmail.com</p>
            </div>

            <div className="card">
              <h3>Miranda Shoraji</h3>
              <p>I am a Computer Science major at Oakland University with a passion for web development.
                  Throughout my experience, I have enjoyed building responsive and user-friendly websites
                  using technologies like HTML, CSS, and JavaScript. While building Mixlist, I was able to 
                  branch out and build my first real-time integrated database with SQLite, and also learn 
                  new frameworks and libraries. I am excited to apply the skills i've gained to real-world 
                  challenges and look forward to continuing to grow as a developer after graduation.
              </p>
              <p>Contact: mirandashoraji@gmail.com</p>
            </div>

            <div className="card">
              <h3>Judy Nashwati</h3>
              <p>I am a Computer Science student with a strong interest in front end development. Through my 
                coursework and personal projects, I discovered how much I enjoy designing and building user 
                interfaces that are both visually appealing and easy to use. I have experience working with HTML, 
                CSS, and JavaScript to create responsive and interactive websites. As I developed my skills, I 
                found satisfaction in turning ideas into real, functional designs and improving the overall user 
                experience. This journey has helped me realize my passion for front-end development, and I am excited 
                to continue growing my skills and applying them to real world projects in the future.
              </p>
            </div>

            <div className="card">
              <h3>Mariam Yassa</h3>
              <p>Hi, my name is Mariam Yassa. I am a senior at Oakland University majoring in Computer Science. 
                I am passionate about UX/UI design. I enjoy front end development that allows applications to become 
                intuitive as well as aesthetically pleasing. I believe that the accessibility  of a application is 
                fundamental to a positive user experience.
              </p>
              <p>Contact: myassa5345@gmail.com</p>
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


            {/* Documentation */}
      <section id="bts" className="info-section alt">
        <section id="bts" className="section">
          <h2 className="section-title">Behind the Scenes</h2>

          <div className="sites-grid">

            <div className="card">
              <h3>
                <a 
                  href="https://mirandashor.github.io/Mixlist-Senior-Capstone/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                 🌐 Technical Website
                </a>
                </h3>
              <p>The page that presents the project overview, including
                purpose, documentation, tech stack, user stories, and more.  
              </p>
            </div>

            <div className="card">
              <h3>
                <a 
                  href="https://github.com/mirandashor/Mixlist-Senior-Capstone" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                🖥️ Github
                </a>
                </h3>
              <p>The central location where all project code, files, 
                and version history are stored and managed. It serves 
                as the single source of truth for the application.</p>
            </div>

            <div className="card">
              <h3>
                <a 
                  href="https://github.com/mirandashor/Mixlist-Senior-Capstone/blob/main/README.md#install-instructions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                📚 README
                </a>
                </h3>
              <p>A guide included in the repository that explains how to
                 install, configure, and run the project, along with key 
                 details about dependencies and usage.</p>
            </div>

          </div>

          <h2 className="section-title">Documentation</h2>
          <div className="docs-grid">
            <div className="card">
              <h3>
                <a 
                  href="https://docs.google.com/document/d/1grGhQ-3INwQ4MRgRBbgLTHG7l3HhXCQo2XrluSKuFT4/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                📄 Executive Summary
                </a>
                </h3>
              <p>A high-level overview of the project that explains the 
                problem, solution, and value in a clear, non-technical 
                way for general audiences.</p>
            </div>

            <div className="card">
              <h3>
                <a 
                  href="https://docs.google.com/document/d/16MoxbxHkbdMz0w5q7Gw08c5yNA2N0JSNlByHseWWjso/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                📄 Technical Specification
                </a>
                </h3>
              <p>A detailed breakdown of the systems architecture, 
                technologies, and components, explaining how the 
                system is structured and how parts interact.</p>
            </div>

            <div className="card">
              <h3>
                <a 
                  href="https://docs.google.com/document/d/1yDiz5kcykonaux2JPIubNU8gX34xEaE7P20TrwmP5H0/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                📄 Product Requirements & Design
                </a>
                </h3>
              <p>A document that defines the products goals, 
                features, target users, and requirements, 
                focusing on what the product should do and why.</p>
            </div>

            <div className="card">
              <h3>
                <a 
                  href="https://docs.google.com/document/d/1b0UdbX_lopTY3qs88QJY8VpDaA0vB4RLu9Irhd1mqmg/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                📄 Developer Design
                </a>
                </h3>
              <p>A technical document that explains how the system 
                is implemented at a deeper level, including logic, 
                workflows, and decisions made for development.</p>
            </div>
          </div>

                    <h2 className="section-title">Media</h2>
          <div className="docs-grid">
            <div className="card">
              <h3>
                <a 
                  href="/Mixlist-Academic-Poster.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                📝 Project Poster
                </a>
                </h3>
            </div>

            <div className="card">
              <h3>
                <a 
                  href="https://youtu.be/73ncWA0c4Bo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                🎥 Project Showcase Video 
                </a>
                </h3>
            </div>

            <div className="card">
              <h3>
                <a 
                  href="https://www.youtube.com/watch?v=Up5_3mpSf7c" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                🎥 Technical Breakdown Video
                </a>
                </h3>
            </div>
          </div>

        </section>
      </section>
<button
  className="back-to-top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  ↑ Back to Top
</button>

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


export default InfoPage;