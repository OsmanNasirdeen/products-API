const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 7000;
const connectDB = require("./database/connectDB");

const {
  getAllUsers,
  getUser,
  addUser,
} = require("./controllers/userControllers");
const {
  getAllProducts,
  addProduct,
  getProductByName,
} = require("./controllers/productControllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", getAllProducts);
app.get("/products/:productName", getProductByName);
app.post("/products/addProduct", addProduct);

// users routes
app.get("/users/allUsers", getAllUsers);
app.post("/users/signUp", addUser);
app.post("/users/logIn", getUser);

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
