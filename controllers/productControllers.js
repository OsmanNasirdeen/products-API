const productModel = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(201).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// filter products by name
const getProductByName = async (req, res) => {
  try {
    const { productName } = req.params;
    const products = await productModel.find({});
    const filteredProducts = products.filter((product) => {
      return product.title.toUpperCase().includes(productName.toUpperCase());
    });
    if (!filteredProducts) {
      return res.status(201).json({
        msg: `product named ${productName} is not found in database`,
      });
    }
    res.status(201).json({ products: filteredProducts });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// add a restaurant to a database function
const addProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({
      status: "product successfully added to database",
      product: product,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update a restaurant details from database function
// const updateRestaurant = async (req, res) => {
//   try {
//     const { restaurantName } = req.params;
//     const newUpdate = await productModel.findOneAndUpdate(
//       { name: restaurantName },
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!newUpdate) {
//       return res.status(201).json({
//         msg: `restaurant named ${restaurantName} is not found in database`,
//       });
//     }
//     res.status(201).json({ updated: newUpdate });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// const deleteRestaurant = async (req, res) => {
//   try {
//     const { restaurantName } = req.params;
//     const restaurant = await productModel.findOneAndDelete({
//       name: restaurantName,
//     });
//     if (!restaurant) {
//       return res.status(201).json({
//         status: "failed",
//         msg: `restaurant named ${restaurantName} is not found in database`,
//       });
//     }
//     res.status(201).json({
//       status: "successful remove restaurant from database",
//       restaurant,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

module.exports = {
  getAllProducts,
  getProductByName,
  addProduct,
  //   updateRestaurant,
  //   deleteRestaurant,
};
