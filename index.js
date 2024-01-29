import express from "express";
import db from "./db/db.js";

const server = express();
const PORT = 8000;

server.use(express.json());

db();

server.listen(PORT, () => console.log(`connected to port ${PORT}`));
