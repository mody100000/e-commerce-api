import express from "express";
import { auth } from "../../middleware/auth.js";
import { cashPayment, getAllOrders } from "../controller/order.controller.js";
import { userAuth } from "./../../middleware/userAuth.js";

const orderRouter = express.Router();

orderRouter.post("/order", auth, cashPayment);
orderRouter.get("/order", auth, getAllOrders);

export default orderRouter;
