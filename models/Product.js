const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: "productImage.png",
    },
    description: {
      type: String,
      default: null,
    },
    number: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    isDiscounted: {
      type: Boolean,
      default: false,
    },
    priceWithDiscount: {
      type: Number,
      default: 0,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    gallery: {
      type: Schema.Types.ObjectId,
      ref: "Gallery",
      default: null,
    },
    productId: String,
    sellCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
