const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "provide product name"],
    trim: true,
    maxLength: [50, "product name can't be more than 50 characters"],
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: [true, "provide product price"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    maxLength: [30, "product category can't be more than 30 characters"],
  },
  image: {
    type: String,
    required: [true, "provide product image"],
    trim: true,
  },
  rating: {
    rate: { type: mongoose.Types.Decimal128, default: 0 },
    count: { type: mongoose.Types.Decimal128, default: 0 },
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
