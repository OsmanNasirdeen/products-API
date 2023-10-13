const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
const port = process.env.PORT || 7000;
const connectDB = require("./database/connectDB");

const {
  getAllUsers,
  getUser,
  logIn,
  signUp,
} = require("./controllers/userControllers");
const verifyToken = require("./auth/auth");
const {
  getAllProducts,
  addProduct,
  getProductByName,
} = require("./controllers/productControllers");

app.get("/", getAllProducts);
app.get("/products/:productName", getProductByName);
app.post("/products/addProduct", addProduct);

// users routes
app.get("/users/allUsers", getAllUsers);
app.post("/users/user", verifyToken, getUser);
app.post("/users/signUp", signUp);
app.post("/users/logIn", logIn);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`server listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
