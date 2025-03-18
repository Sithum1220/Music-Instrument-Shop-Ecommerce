const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require('multer');
const fs = require("fs");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    const imageFile = req.file; // Assuming the image file is sent in the request file object

    if (!name || !description || !price || !quantity || !category || !imageFile) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Upload image to Cloudinary and get the image URL
    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, { folder: 'Ecommerce-Products-Music' });
    const imageUrl = uploadedImage.secure_url;

    // Determine the status based on the quantity
    const status = quantity > 0 ? "Available" : "Sold Out";

    const newProduct = new Product({
      name,
      description,
      price,
      image: imageUrl, 
      quantity,
      category,
      status 
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Product ID:', id); 
    const { name, price, quantity, category } = req.body;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    if (name) product.name = name;
    if (price !== undefined) product.price = parseFloat(price);
    if (quantity !== undefined) product.quantity = parseInt(quantity, 10);
    if (category) product.category = category;

    product.status = product.quantity > 0 ? "Available" : "Sold Out";

    const updatedProduct = await product.save();

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};



const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, isDeleted: false });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};



module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};