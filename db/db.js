import mongoose from "mongoose";

const db = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("error", err));
};
export default db;
