import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  try {
    await mongoose.connect(process.env.conestionSTR);
    const data = await Product.find();
    console.log("SuccessFully connected", data);
    return NextResponse.json({ result: data });
  } catch (error) {
    console.log("connection error! data not found", data);
    return NextResponse.json({ result: data });
  }
}
export async function POST() {
  await mongoose.connect(process.env.conestionSTR);
  let product = new Product({
    name: "Note 10+",
    color: "black",
    price: 500000,
    company: "samsung",
    category: "primium phone",
  },
  {
    name: "apple 12pro",
    color: "blue",
    price: 100000,
    company: "apple",
    category: "gold edition",
  });
  const result = await product.save();
  return NextResponse.json({ result, success: true });
}
