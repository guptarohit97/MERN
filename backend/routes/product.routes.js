import express from "express";
import Product from "../models/product.model.js";


const router = express.Router();

router.post("/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image)
    return res.status(400).json({
      success: false,
      error: "Provide all fields",
    });
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error in Creating product:", error.message);
    res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
});
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
      console.log("DELETE route called:", req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id);
    console.log(product)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
      res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
