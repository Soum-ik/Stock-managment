import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  let { action, name, initialQuantity } = await request.json();

  const uri =
    "mongodb+srv://NexProject:fontendDeveloper@mongoyoutube.nhtraxd.mongodb.net/productDB/products";
  const client = new MongoClient(uri);
  try {
    const database = client.db("productDB");
    const products = database.collection("products");
    const filter = { name: name };

    let newQuantity =
      action == "plus"
        ? parseInt(initialQuantity) + 1
        : parseInt(initialQuantity) - 1;
    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };
    const result = await inventory.updateOne(filter, updateDoc, {});

    return NextResponse.json({
      success: true,
      message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: `Some error occurred`,
    });
  } finally {
    await client.close();
  }
}
