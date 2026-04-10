import { useNavigate } from "react-router-dom";
import "./join.css";
// store changing data (room code input)
import React, { useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Join = () => {
  const navigate = useNavigate();

  //roomCode = current variable in the input box (empty)
  //setRoomCode = updates the value when a user inputs a room code
  const [roomCode, setRoomCode] = useState("");

  //get the logged in users id from URL
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  //send post request to backend to know what room to join & get user id for who is joining
  const handleJoin = async () => {
    try {
      if (!userId) {
        alert ("no logged in user found");
        return;
      }
      //join session using user id to add to the session
      const res = await fetch(`${apiBaseUrl}/api/session/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomCode,
          userId: Number(userId),
        }),
      });

      //get backend respone- error or join
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to join session");
        return;
      }

      //send the user to join the host page
      //give guest role so they cannot see/change parameters
      navigate(`/host?roomCode=${roomCode}&role=guest&userId=${userId}`);
    } catch (err) {
      console.error("join error:", err);
      alert("server error");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🎵</span>
          <span>Mixlist</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#flow">How it works</a>
          <a href="/#features">FAQ</a>
          <a href="/#about">Support</a>
        </div>
      </nav>

      <main className="page-wrapper">
        <section className="join-hero">
          <div className="join-hero-text">
            <span className="hero-badge">Join a live session</span>
            <h1>Jump into the mix</h1>
            <p>
              Enter a room code or scan a QR code to join an active Mixlist
              and add your music taste to the room.
            </p>
          </div>
        </section>

        <section className="join-card">
          <h2>Join a Mixlist</h2>
          <p className="join-subtext">
            Ready to add your taste to the playlist?
          </p>

          <form className="join-form">
            <div className="input-row">
              <input
                type="text"
                placeholder="Enter room code"
                className="room-input"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />
              {/* value = roomCode shows whatever is in state 
              onChange = when user types, save it into roomCode */}

              <button type="button" className="join-btn" onClick={handleJoin}>
                Join
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

          </form>
        </section>

        <section className="info-section">
          <div className="info-card">
            <h3>Quick Join</h3>
            <p>Enter the room code from your host and join in seconds.</p>
          </div>

          <div className="info-card">
            <h3>QR Option</h3>
            <p>Scan a QR code if the host has one available for the session.</p>
          </div>

          <div className="info-card">
            <h3>Live Playlist</h3>
            <p>
              Once you are in, your preferences can help shape the mix in real
              time.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Join;