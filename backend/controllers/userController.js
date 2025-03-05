const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/createToken");

// ✅ Create User
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "Please fill all the inputs" });
    return;
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    generateToken(res, newUser.id);

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// ✅ Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  generateToken(res, existingUser.id);

  res.status(200).json({
    id: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
});

// ✅ Logout User
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Get All Users (Admin Only)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
});

// ✅ Get Current User Profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

// ✅ Update Current User Profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcryptjs.hash(req.body.password, 10);
    }

    await user.save();

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// ✅ Get User by ID (Admin Only)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// ✅ Delete User by ID (Admin Only)
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "Cannot delete admin user" });
      return;
    }

    await user.destroy();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

// ✅ Update User by ID (Admin Only)
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    await user.save();

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getUserById,
  deleteUserById,
  updateUserById,
};
