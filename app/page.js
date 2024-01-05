"use client";

import React, { useState } from "react";

const Page = () => {
  const [name, setName] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [quantity, setQuantity] = useState(undefined);
  // const [laoding, setLaoding] = useState(true);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          quantity,
        }),
      });

      if (response.ok) {
        // setLaoding(false);
        alert("Your product was successfully added");
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      // setLaoding(false);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto my-8 sm:px-15 px-10">
        <h1 className="text-3xl font-semibold mb-6">Search</h1>
        <input
          type="text"
          placeholder="Search products"
          className="w-full border border-gray-300 px-4 py-2 mb-6"
          // onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Main content container */}
      <div className="container mx-auto my-8 sm:px-15 px-10">
        {/* Add product header */}
        <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

        {/* Product form */}
        <form className="space-y-10">
          {/* Product Name input */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            type="text"
            className="w-full border border-gray-300 px-4 py-2 "
            required
          />

          {/* Product Price input */}
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter product price"
            className="w-full border border-gray-300 px-4 py-2 "
            required
          />

          {/* Product Quantity input */}
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter product quantity"
            type="number"
            className="w-full border border-gray-300 px-4 py-2 "
            required
          />

          {/* Submit button */}
          <button
            // disabled={laoding}
            onClick={addProduct}
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
          >
            Add product
          </button>
        </form>
      </div>

      <div className="container mx-auto my-8 sm:px-15 px-10">
        {/* Display stock header */}
        <h1 className="text-3xl font-semibold mb-6">Product Stock</h1>

        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Product Name</td>
              <td className="border border-gray-300 px-4 py-2">Price</td>
              <td className="border border-gray-300 px-4 py-2">Quantity</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
