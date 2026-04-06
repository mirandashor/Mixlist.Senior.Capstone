function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <button onClick={handleLogin}>
        Login with Spotify
      </button>
    </div>
  );
}

export default Login;