// const mongoose = require('mongoose')

// const connectDb = async () =>{
//     try {

//         await mongoose.connect(process.env.DATABASE_URL)
//         console.log('Connected database');

//     } catch (error){
//         console.error(`ERROR: ${error.messagd}`)
//     }
    
// }

// module.exports = connectDb;
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: "mysql",
  logging: false,
});

const connectDb = async () => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database "${process.env.DB_NAME}" ensured.`);

    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log(" Database synchronized");
  } catch (error) {
    console.error(` ERROR: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDb };
