const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const M = require("./messages");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    if (token) {
      const thisDecodedToken = await jwt.verify(token, process.env.SECRET);
      console.log(thisDecodedToken);
      if (!thisDecodedToken)
        return res
          .status(401)
          .json({ success: false, msg: M.UNAUTHORIZED_ACCESS });
      const thisUser = await User.findOne({ _id: thisDecodedToken._id });
      req.user = thisUser;
      next();
    } else {
      return res.status(403).json({ success: false, msg: M.NO_TOKEN });
    }
  } catch (error) {
    res.status(500).send({ error: `An error has Accured ${error}` });
  }
};
