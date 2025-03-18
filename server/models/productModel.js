const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: { 
      type: String, 
      required: true 
    }, 
    quantity: {
      type: Number,
      required: true,
    },
    category: { 
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Sold Out"],
      default: "Available",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
