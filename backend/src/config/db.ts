import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const server = express;
const app = server();
const PORT = 8080 || process.env.PORT;

app.use(cors());
app.use(express.json());

export default { app, PORT, server };
