module.exports = async (req, res, next) => {
  if (
    req.user.role !== "superAdmin" &&
    req.user.role !== "admin" &&
    req.user.role !== "customer" &&
    req.user.role !== "seller"
  ) {
    return res.status(403).send({ error: "Access Denied!" });
  }
  next();
};
