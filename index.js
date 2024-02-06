import express from "express";
import db from "./db/db.js";
import dotenv from "dotenv";
import userRoutes from "./src/user/routes/user.routes.js";
import productRoutes from "./src/product/routes/product.routes.js";
import categoryRoutes from "./src/category/routes/category.routes.js";
import couponRoutes from "./src/coupon/routes/coupon.routes.js";
import cartRoutes from "./src/Cart/routes/cart.routes.js";

dotenv.config();

const server = express();
const PORT = 8000;

db();
server.use(express.json());
server.use("/images", express.static("images"));
server.use(userRoutes);
server.use(productRoutes);
server.use(categoryRoutes);
server.use(couponRoutes);
server.use(cartRoutes);

server.listen(PORT, () => console.log(`connected to port ${PORT}`));
