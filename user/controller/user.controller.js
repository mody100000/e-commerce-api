import userModel from "../../db/models/user/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//sginUp
export const signUp = async (req, res) => {
  const { userName, email, password, CPassword, role, address } = req.body;
  if (password !== CPassword) {
    return res.json({
      message: "password and CPassword must be same",
    });
  }
  let foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
    res.json({ message: "user already register" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 8);
    let addedUser = await userModel.insertMany({
      userName,
      email,
      password: hashedPassword,
      role,
      address,
    });
    res.json({ message: "added", addedUser });
  }
};

//sginIn
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  let foundedUser = await userModel.findOne({ email });
  if (!foundedUser) res.json({ message: "you need to register first" });
  const checkPassword = bcrypt.compareSync(password, foundedUser.password);
  if (checkPassword) {
    const { password, ...rest } = foundedUser.toJSON();
    console.log(rest.enabled);
    const token = jwt.sign(rest, process.env.JWT_SECRET);
    res.json({ message: "welcome", token });
  } else {
    res.json({ message: "invaled password" });
  }
};

export const updateUser = async (req, res) => {
  let { userName, email, address, enabled } = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      userName,
      email,
      enabled,
      address,
    },
    { new: true }
  );
  if (!updatedUser) res.send("The user with the given ID was not found.");
  res.json({ message: "updated", updatedUser });
};

export const resetPassword = async (req, res) => {
  let { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  const updatedPassword = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: hashedPassword,
    },
    { new: true }
  );
  res.json({ message: "reset password", updatedPassword });
};
