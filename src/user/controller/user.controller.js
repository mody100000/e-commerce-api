import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./../../../db/models/user/user.js";
import sendEmail from "./../../services/sendEmail.js";

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
    // TODO:dont forget to add the newUser token in dotenv file

    const token = jwt.sign({ id: addedUser[0]._id }, "NewUser");
    const url = `http://localhost:8000/user/Verfiy/${token}`;
    sendEmail(email, url);
    res.json({ message: "added", addedUser });
  }
};

//sginIn
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  let foundedUser = await userModel.findOne({ email });
  if (!foundedUser) return res.json({ message: "you need to register first" });
  if (!foundedUser.isVerfied)
    return res.json({ message: "you need to verfiy your email first" });
  if (!foundedUser.enabled)
    return res.json({ message: "your email is disabled" });

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

//verfiy Account

export const verfiyAccount = (req, res) => {
  const { token } = req.params;
  // TODO:dont forget to add the newUser token in dotenv file
  jwt.verify(token, "NewUser", async (err, decoded) => {
    let foundedUser = await userModel.findById(decoded.id);
    if (!foundedUser) return res.json({ message: "invalid user" });
    let updateVerfiy = await userModel.findByIdAndUpdate(
      decoded.id,
      { isVerfied: true },
      { new: true }
    );
    res.json({ message: "your email is Verfied", updateVerfiy });
  });
};
//TODO:forget password ????????????????:(
