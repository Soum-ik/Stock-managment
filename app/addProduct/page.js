"use client"; 
import React, { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("Name");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true)
    let result = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        quantity,
      }),
    });

    console.log(result);
    if (result.status === 200) {
      alert("Your product successfully added");
      setLoading(false)
    } else {
      alert("Failed to add product. Please try again.");
      setLoading(true)
    }
  };

  return (
    <div className="container mx-auto my-8 sm:px-15 px-10">
      <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

      <form onSubmit={addProduct} className="space-y-10">
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="add your product name"
          type="text"
          id="name"
          className="w-full border border-gray-300 px-4 py-2 "
        />
        <input
          value={price}
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="price"
          id="name"
          className="w-full border border-gray-300 px-4 py-2 "
        />
        <input
          value={quantity}
          name="quantity"
          placeholder="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          type="text"
          id="name"
          className="w-full border border-gray-300 px-4 py-2 "
        />

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
        >
          {loading ? "add product" : "addingea"}
        </button>
      </form>
    </div>
  );
}
