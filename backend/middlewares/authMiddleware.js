const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("./asyncHandler");

const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.userId, { attributes: { exclude: ["password"] } });
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed." });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token." });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { authenticate, authorizeAdmin };
