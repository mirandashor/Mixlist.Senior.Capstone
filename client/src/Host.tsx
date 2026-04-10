//use state for room code and users
//use effect for reading query param and fetch users when the room exists
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./host.css";
import logo from "./assets/logo.png";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Host = () => {
  const navigate = useNavigate();
  //room code stores current room code, setRoomCode updates the room code
  //users stores list of users in the session, setUsers updates teh users list 
  const [roomCode, setRoomCode] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  //roles state, set if user or guest
  const [role, setRole] = useState("");

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

        if (!res.ok) {
          console.error(data.error || "failed to get users");
          return;
        }

        setUsers(data.users || data || []);
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

  const handleCreate = () => {
    navigate("/hostorjoin");
  };

  return (
    <>
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={logo} alt="Mixlist logo" />
          <span>Mixlist</span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#flow">How it works</a>
          <a href="/#features">FAQ</a>
          <a href="/#about">About Us</a>
          <a href="/#about">Support</a>
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
          <p><strong>Room Code:</strong> {roomCode}</p>
          {/* // if role is set gust show waiting  */}
          {role === "guest" && (
            <p><strong>Waiting for host to start the session...</strong></p>
          )}

          <div>
            <h3>Users:</h3>
            {/* if no users, show message*/}
            {users.length === 0 ? (
              <p>No users yet</p>
            // else, show list of users
            ) : (
              <ul>
            {/* loop through users array */}
                {users.map((user, index) => (
                  <li key={index}>
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
                Pick the mood and start the session.
              </p>

              <form className="host-form">
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Mix your mood"
                    className="mood-input"
                  />

                  <button
                    type="button"
                    className="create-btn"
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>

                <div className="host-message">
                  Be the blueprint, then invite others to mix the rest.
                </div>
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
                  You are connected to the room and waiting for the host to finish setting the vibe.
                </p>
              </div>

              <div className="info-card">
                <h3>Host is Mixing</h3>
                <p>
                  The host is choosing the mood, genre, or overall sound for this session.
                </p>
              </div>

              <div className="info-card">
                <h3>Get Ready to Join</h3>
                <p>
                  Once the session starts, everyone in the room can build the mix together.
                </p>
              </div>
            </>
          ) : (
            //else, info section for host view
            <>
              <div className="info-card">
                <h3>Choose the Vibe</h3>
                <p>
                  Set the tone with a genre, mood, or overall sound for the room.
                </p>
              </div>

              <div className="info-card">
                <h3>Create the Session</h3>
                <p>
                  Launch your Mixlist and make it ready for others to join.
                </p>
              </div>

              <div className="info-card">
                <h3>Invite Others</h3>
                <p>
                  Share the room code or QR code so everyone can add their taste.
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Host;