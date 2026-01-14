import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
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