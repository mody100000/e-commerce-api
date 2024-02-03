export default function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  const role = req.user.role;
  if (role == "admin") return next();
  res.status(403).send("Access denied.");
}
