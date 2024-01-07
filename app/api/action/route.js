import { Product } from "@/lib/model/product";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  let { action, name, initialQuantity } = await request.json();

  try {
    const filter = { name: name };

    // it's updateing quantity start
    let newQuantity =
      action == "plue"
        ? parseInt(initialQuantity) + 1
        : parseInt(initialQuantity) - 1;
    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };
    // it's updateing quantity end

    const result = await Product.updateMany(filter, updateDoc, {});
    console.log(result);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log("Updated document not successfuly");
    return NextResponse.json({ result, success: false });
  }
}
