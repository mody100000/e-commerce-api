import express from "express";
import { cashPayment } from "../controller/order.controller.js";
import { userAuth } from "./../../middleware/userAuth.js";

const orderRouter = express.Router();

orderRouter.post("/order", userAuth, cashPayment);

export default orderRouter;
