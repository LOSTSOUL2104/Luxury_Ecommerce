// const path = require('path');
// const express = require('express')
// const dotenv = require('dotenv')
// const cookieParser = require('cookie-parser')
// const connectDb = require('./config/db');
// const userRoutes = require('./routes/userRoutes')

// dotenv.config()
// const port = process.env.PORT || 5000;
// connectDb();

// const app = express();
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(cookieParser())
// // app.get('/', (req,res) =>{
// // res.send("hjhh fdg fhf h")
// // } )
// app.use('/api/users', userRoutes);

// app.listen(port, ()=>{
//     console.log("Server started");
// })

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDb } = require('c:/Users/VICTUS/Desktop/Luxary Ecommerce/backend/config/db.js');
const userRoutes = require('./routes/userRoutes');
const {generateToken} = require('c:/Users/VICTUS/Desktop/Luxary Ecommerce/backend/utils/createToken.js') 

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

// Connect to database and start server
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
