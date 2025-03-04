// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     username:{
//         type:String,
//         required: true,
//     },

//     email:{
//         type:String,
//         required:true,
//         unique: true,
//     },

//     password:{
//         type:String,
//         required:true,
//     },

//     isAdmin:{
//         type:Boolean,
//         required: true,
//         default:false,
//     }
// }, 
// {timestamps: true}

// );

// const User = mongoose.model('User', userSchema);

// module.exports = User;


const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = User;
