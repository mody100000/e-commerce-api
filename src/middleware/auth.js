import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ message: "token err", err });
    req.user = decoded;
    if (req.user.enabled) return next();
    res.json({ message: "your email is disabled" });
  });
};
