import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; 
import User from "./userModel.js"; 
import Category from "./categoryModel.js"; 

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define Product Model
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    numReviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);


Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "productId" });

Product.belongsTo(User, { foreignKey: "userId", as: "user" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" }); 

export { Product, Review };
