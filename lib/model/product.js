import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name: String,
  price: Number,
  qualtity: Number,
});

export const Product =
  mongoose.models.products || mongoose.model("products", productModel);
