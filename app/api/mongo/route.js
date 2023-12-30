import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ "a ": 323 });
}

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://soumiksarkar:fontendDeveloper69@cluster0.ankq3y9.mongodb.net/";

const client = new MongoClient(uri);

try {
  const database = client.db("stock");
  const movies = database.collection("users");

  const query = {};
  const movie = await movies.findOne(query);

  console.log(movie);
} finally {
  await client.close();
}
