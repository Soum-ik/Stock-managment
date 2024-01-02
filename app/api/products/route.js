import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  try {
    await mongoose.connect(process.env.conestionSTR);
    const data = await Product.find();
    console.log("SuccessFully connected", data);
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.log("connection error! data not found", data);
    return NextResponse.json({ result: data });
  }
}
export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(process.env.conestionSTR);
  let product = new Product();
  const result = await product.save(payload);
  return NextResponse.json({ result, success: true });
}
