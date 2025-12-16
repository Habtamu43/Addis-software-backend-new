import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songRoutes);

export default app;
