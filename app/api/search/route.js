import { Product } from "@/lib/model/product";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    const result = await Product.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: query, $options: "i" } }],
        },
      },
    ]);
    console.log("Successfully connected", result);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Connection error! Data not found", error);
    return NextResponse.json({
      result: null,
      success: false,
      error: "Data not found",
    });
  }
}
