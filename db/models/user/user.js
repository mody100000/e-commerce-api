import mongoose from "mongoose";

const schema = mongoose.Schema;

const addressSchema = new schema({
  street: String,
  city: String,
  country: String,
});

const userSchema = new schema({
  userName: String,
  email: String,
  password: String,
  role: String,
  isVerfied: Boolean,
  address: [addressSchema],
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
