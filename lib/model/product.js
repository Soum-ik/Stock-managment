import mongoose from "mongoose";
const conn = mongoose.createConnection(process.env.conestionSTR);

const productModel = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

export const Product =
  mongoose.models.products || conn.model("products", productModel);
