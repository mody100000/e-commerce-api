import jwt from "jsonwebtoken";
import userModel from "./../db/models/user/user.js";
export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.json({ message: "Invalid token" });
    }

    const user = await userModel.findById(decoded._id);

    if (!user) {
      console.error("User not found in the database");
      return res.json({ message: "User not found" });
    }

    req.user = decoded;
    req.userId = decoded.userId;
    req.role = user.role;

    if (user.enabled) {
      next();
    } else {
      res.json({ message: "Your email is disabled" });
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
