"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [productForm, setProductForm] = useState({});
  const [loading, setLaoding] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          );
          return;
        }

        let rjson = await response.json();
        setProducts(rjson.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    if (!productForm.name || !productForm.price || !productForm.quantity) {
      alert("Please fill in all the required fields");
      return;
    }

    setLaoding(true);
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok || response.status === 200) {
        setProductForm();
        alert("Your product was successfully added");
        setLaoding(false);
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      setLaoding(false);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mx-auto my-5 sm:px-15 px-10">
        <h1 className="text-3xl font-semibold mb-6">Search</h1>
        <input
          type="text"
          placeholder="Search products"
          className="w-full border border-gray-300 px-4 py-2 mb-6"
        />
      </div>

      {/* Main content container */}
      <div className="container mx-auto my-5 sm:px-15 px-10">
        {/* Add product header */}
        <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

        {/* Product form */}
        <form className="space-y-5">
          {/* Product Name input */}
          <input
            value={productForm?.name || ""}
            name="name"
            placeholder="enter your product name"
            onChange={handleChange}
            type="text"
            id="name"
            className="w-full border border-gray-300 px-4 py-2"
          />

          {/* Product Price input */}
          <input
            value={productForm?.price || ""}
            name="price"
            placeholder="enter your product price"
            onChange={handleChange}
            type="text"
            id="price"
            className="w-full border border-gray-300 px-4 py-2"
          />

          {/* Product Quantity input */}
          <input
            value={productForm?.quantity || ""}
            name="quantity"
            placeholder="enter your product quantity"
            onChange={handleChange}
            type="text"
            id="quantity"
            className="w-full border border-gray-300 px-4 py-2"
          />

          {/* Submit button */}
          <button
            disabled={loading}
            onClick={addProduct}
            type="submit"
            className={`bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add product"}
          </button>
        </form>
      </div>

      <div className="container mx-auto my-8 sm:px-15 px-10">
        {/* Display stock header */}
        <h1 className="text-3xl font-semibold mb-6">Product Stock</h1>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className=" text-center">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr className=" text-center" key={product}>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.quantity}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
