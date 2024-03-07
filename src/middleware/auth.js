import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) return res.json({ message: "token err" });
  const [_, token] = authorization.split(" ");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ message: "token err", err });
    req.user = decoded;
    if (req.user.enabled) return next();
    res.json({ message: "your email is disabled" });
  });
};
