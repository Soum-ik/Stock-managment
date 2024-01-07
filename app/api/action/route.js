import { Product } from "@/lib/model/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  let { action, name, initialQuantity } = await request.json();

  try {
    const filter = { name: name };

    let newQuantity =
      action == "plue" ? initialQuantity + 1 : initialQuantity - 1;
    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };

    const result = await Product.updateMany(filter, updateDoc, {});

    console.log(result);
  } catch (error) {
    console.log("Updated document not successfuly", error);
    return NextResponse.json({ result: false });
  }
}
