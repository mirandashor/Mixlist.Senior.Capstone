//use state for room code and users
//use effect for reading query param and fetch users when the room exists
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./host.css";
import logo from "./assets/logo.png";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Host = () => {
  const navigate = useNavigate();

  //room code stores current room code, setRoomCode updates the room code
  const [roomCode, setRoomCode] = useState("");

  //selectedGenre stores chosen genres, setSelectedGenre updates them
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

  //smart & top hits rec's
  const [includeSmart, setIncludeSmart] = useState(false);
  const [includeTopHits, setIncludeTopHits] = useState(false);

  //search bar functionality
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  //users stores list of users in the session, setUsers updates teh users list
  const [users, setUsers] = useState<any[]>([]);

  //roles state, set if user or guest
  const [role, setRole] = useState("");

  //Loading Icon
  const [isLoading, setIsLoading] = useState(false);

  //get room code from URL,runs when page loads to get the url then extract the room code
  //then save it to the state. this lets the page know which session it is in
  //same with role-let page know if the role is hosst or guest
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("roomCode") || "";
    const userRole = params.get("role") || "";
    setRoomCode(code);
    setRole(userRole);
  }, []);

  //fetch users. doesnt run until there is a room code
//calls backend to get the users in the session with the specific room code
//converts the response into useable json data, then stores it in state
useEffect(() => {
  if (!roomCode) return;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/session/${roomCode}/users`);
      const data = await res.json();

      console.log("USERS RESPONSE:", data); //debug log

      if (!res.ok) {
        console.error(data.error || "failed to get users");
        return;
      }

      //handles different response shapes (array vs object with users key)
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers(data.users || []);
      }

    } catch (err) {
      console.error("error getting users:", err);
    }
  };

  //runs when the room code changes
  fetchUsers();

  //auto refresh so we can see new users
  const interval = setInterval(fetchUsers, 3000);

  return () => clearInterval(interval);
}, [roomCode]);
  //helper var to check if guest or host for what they see on site
  const isGuest = role === "guest";

  // polling for playlist readiness
useEffect(() => {
  if (role !== "guest" || !roomCode) return;

  let interval: any;

  const checkStatus = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/spotify/status/${roomCode}`);
      const data = await res.json();

      console.log("STATUS CHECK:", data);

const playlistId = data.playlistId || data.session?.playlistId;

if (data.ready && playlistId) {
        clearInterval(interval); 

navigate(
  `/dashboard?playlistId=${playlistId}` +
  `&name=${encodeURIComponent(data.playlistName || data.session?.playlistName || "Mixlist")}` +
  `&users=${encodeURIComponent((data.users || data.session?.users || []).join(","))}`
);
      }
    } catch (err) {
      console.error("status check error:", err);
    }
  };
//run immediately
  checkStatus();
  interval = setInterval(checkStatus, 2000);
//poll every 2 seconds
  return () => clearInterval(interval);
}, [role, roomCode, navigate]);

  const handleGeneratePlaylist = async () => {

    //Loading State
    setIsLoading(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");

      if (!accessToken) {
        alert("Missing access token");
        setIsLoading(false);
        return;
      }

      if (selectedGenre.length === 0) {
        alert("Please select at least one genre");
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${apiBaseUrl}/api/spotify/generate-playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          roomCode,
          genre: selectedGenre,
          includeSmart,
          includeTopHits,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to generate playlist");
        setIsLoading(false);
        return;
      }

      navigate(
        `/dashboard?playlistId=${data.playlistId}` +
        `&name=${encodeURIComponent(data.playlistName)}` +
        `&users=${encodeURIComponent(data.users.join(","))}`
      );
      
    } catch (err) {
      console.error("generate error:", err);
      alert("Server error");
      setIsLoading(false);
    }
  };

  // genre filtering search bar
  const genres = [
    "Rock",
    "Indie",
    "Soundtracks",
    "Christmas",
    "Metal",
    "Pop",
    "Ska",
    "Classical",
    "Country",
    "Electronic",
    "Christian",
    "Rap",
    "R&B",
    "Reggae",
    "Techno",
    "Dubstep",
  ].sort();

const filteredGenres = search
  ? genres.filter(
      (g) =>
        g.toLowerCase().includes(search.toLowerCase()) &&
        !selectedGenre.includes(g)
    )
  : genres.filter(g => !selectedGenre.includes(g));
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

      <main className="page-wrapper">
        <section className="host-hero">
          <div className="host-hero-full">
            <div className="badge-row">
              <button className="back-btn" onClick={() => navigate(-1)}>
                ← Go Back
              </button>

              <span className="hero-badge">
                {isGuest ? "Waiting room" : "Start your own session"}
              </span>
            </div>

            <div className="host-hero-text">
              <h1>
                {isGuest
                  ? "Waiting for the host to start"
                  : "Set the mood for the room"}
              </h1>

              <p>
                {isGuest
                  ? "The host is mixing the vibe for this room. Hang tight until the session starts and you’ll be directed to the Mix."
                  : "Start a new Mixlist by choosing the vibe, genre, or mood you want."}
              </p>
            </div>
          </div>
        </section>

        <section className="host-card">
          <h2>{isGuest ? "Waiting Room" : "Host a Mixlist"}</h2>

          <div className="host-meta">
            <div className="meta-box">
              <span className="meta-label">Room Code</span>
              <span className="meta-value">{roomCode}</span>
            </div>

            <div className="meta-box">
              <span className="meta-label">Status</span>
              <span className="meta-value">
                {isGuest ? "Waiting for host" : "Ready to create"}
              </span>
            </div>
          </div>

          {/* // if role is set gust show waiting  */}
          {role === "guest" && (
            <p className="host-subtext">
              Waiting for host to start the session...
            </p>
          )}

          <div className="users-section">
            <h3 className="users-title">Users</h3>

            {/* if no users, show message*/}
            {users.length === 0 ? (
              <div className="empty-pill">No users yet</div>
            ) : (
              <ul className="user-list">
                {/* loop through users array */}
                {users.map((user, index) => (
                  <li key={index} className="user-pill">
                    {/* shows display name*/}
                    {user.display_name || "User"}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* if user is not guest, show host controls */}
          {role !== "guest" && (
            <>
              <p className="host-subtext">
                Pick the mood and start the session
              </p>

              <div className="genre-block">
                <label className="genre-label">Choose genres</label>

                {/* Selected tags */}
                <div className="selected-tags">
                  {selectedGenre.map((g) => (
                    <span key={g} className="genre-tag">
                      {g}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedGenre((prev) =>
                            prev.filter((x) => x !== g)
                          )
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Search input */}
                <input
                  type="text"
                  className="genre-search"
                  placeholder="Search genres..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
                  <span
                    onClick={() => setShowDropdown(prev => !prev)}
                    style={{
                      position: "absolute",
                      right: "15px",
                      transform: "translateY(90%)",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    ▼
                  </span>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="genre-dropdown">
                    {filteredGenres.length > 0 ? (
                      filteredGenres.map((g) => (
                        <div
                          key={g}
                          className="genre-option"
                          onClick={() => {
                            setSelectedGenre((prev) => [...prev, g]);
                            setSearch("");
                            setShowDropdown(false);
                          }}
                        >
                          {g}
                        </div>
                      ))
                    ) : (
                      <div className="genre-option">No matching genres</div>
                    )}
                  </div>
                )}
              </div>

              <div className="options-block">
                <h3 className="options-label">Playlist Options</h3>

                <div className="options-row">
                  <label className="option-pill">
                    <input
                      type="checkbox"
                      checked={includeSmart}
                      onChange={(e) => setIncludeSmart(e.target.checked)}
                    />
                    {" "}Smart Recommendations
                  </label>

                  <label className="option-pill">
                    <input
                      type="checkbox"
                      checked={includeTopHits}
                      onChange={(e) => setIncludeTopHits(e.target.checked)}
                    />
                    {" "}Popular Recommendations
                  </label>
                </div>
              </div>

              <form
                className="host-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGeneratePlaylist();
                }}
              >
              <button 
                type="submit" 
                className="create-btn"
                disabled={isLoading}
              >
                {isLoading ? "Mixing" : "Create"}
              </button>

              </form>
            </>
          )}
        </section>

        {/* //info section for guest role view */}
        <section className="info-section">
          {isGuest ? (
            <>
              <div className="info-card">
                <h3>Waiting Room</h3>
                <p>
                  You are connected to the room and waiting for the host to
                  finish setting the vibe.
                </p>
              </div>

              <div className="info-card">
                <h3>Host is Mixing</h3>
                <p>
                  The host is choosing the mood, genre, or overall sound for
                  this session.
                </p>
              </div>

              <div className="info-card">
                <h3>Get Ready to Join</h3>
                <p>
                  Once the session starts, everyone in the room can build the
                  mix together.
                </p>
              </div>
            </>
          ) : (
            //else, info section for host view
            <>
              <div className="info-card">
                <h3>Invite others</h3>
                <p>
                  Share the room code with your friends and 
                  have them join the Mix
                </p>
              </div>

              <div className="info-card">
                <h3>Choose the Vibe</h3>
                <p>
                  Set the tone by picking from the provided genres
                </p>
              </div>

              <div className="info-card">
                <h3>Create the Session</h3>
                <p>
                  Click "Create" and launch your Mixlist..
                </p>
              </div>
            </>
          )}
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

export default Host;