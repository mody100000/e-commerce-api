import express from "express";
import db from "./db/db.js";
import userRoutes from "./user/routes/user.routes.js";
import dotenv from "dotenv";
import productRoutes from "./product/routes/product.routes.js";

dotenv.config();

const server = express();
const PORT = 8000;

db();
server.use(express.json());
server.use(userRoutes);
server.use(productRoutes);
server.listen(PORT, () => console.log(`connected to port ${PORT}`));
