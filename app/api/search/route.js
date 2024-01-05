import { Product } from "@/lib/model/product";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  try {
    const data = await Product.find();
    console.log("SuccessFully connected", data);
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.log("connection error! data not found", data);
    return NextResponse.json({ result: data, success: true });
  }
}
