import mongoose from "mongoose";

const db = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/e-commerce")
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("error", err));
};
export default db;
