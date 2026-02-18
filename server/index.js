import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://neuratalk.onrender.com"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "NeuraTalk API running" });
});

app.use("/api/chat", chatRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Internal server error"
  });
});

app.listen(port, () => {
  console.log(`NeuraTalk server listening on port ${port}`);
});