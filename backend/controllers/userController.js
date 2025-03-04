// const User = require('../models/userModel')
// const asyncHandler = require('../middlewares/asyncHandler')

// const createUser = asyncHandler(async (req,res) =>{
//     const {username, email, password} = req.body;


//     if(!username || !email || !password){
//         throw new Error("Please fill all the inputs");
//     }

//     const UserExists = await User.findOne({email})
//     if(UserExists){
//         res.status(400).send("user already exists");
//     }

//     const newUser = new User({username, email, password})
//     try{
//         await newUser.save()

//         res.status(201).json({_id:newUser._id, 
//             username:newUser.username,
//             email:newUser.email,
//             isAdmin: newUser.isAdmin
//         })
//     }
//     catch(error){
//         res.status(400)
//         throw new error("Invalid user data")
//     }
// })

// module.exports = {createUser};

const User = require('c:/Users/VICTUS/Desktop/Luxary Ecommerce/backend/models/userModel.js');
const asyncHandler = require('../middlewares/asyncHandler');
const bcryptjs = require('bcryptjs');
const generateToken = require('../utils/createToken');

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error('Please fill all the inputs');
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400).send('User already exists');
    return;
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    const newUser = await User.create({ username, email,password:hashedPassword });
    generateToken(res, newUser.id);
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Checking if password matches
  const isPasswordValid = await bcryptjs.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  createToken(res, existingUser._id);
  // Send user data 
  res.status(200).json({
    id: existingUser.id, 
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
});


const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll(); 
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    res.json({
      id: user.id, 
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});




module.exports = { createUser , loginUser,logoutCurrentUser, getAllUsers, getCurrentUserProfile};
