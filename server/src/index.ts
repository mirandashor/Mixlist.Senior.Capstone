import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import playlistRoutes from "./routes/playlistRoutes"; 
import sessionRoutes from "./routes/sessionRoutes"


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/spotify", playlistRoutes);
app.use("/api/session", sessionRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Mixlist server is running");
});

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});