"use client";
import { set } from "mongoose";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [productForm, setProductForm] = useState({});
  const [loading, setLaoding] = useState(false);
  const [products, setProducts] = useState([]);
  const [dropDown, setDropDown] = useState([]);
  const [query, setQuery] = useState("");

  console.log(dropDown, "this is a dropdow");
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      let data = await response.json();
      setProducts(data.result);
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

  const onDropDown = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setLaoding(false);
    if (!loading) {
      setLaoding(true);
      setDropDown([]);
      const response = await fetch(
        "http://localhost:3000/api/search?query=" + query
      );
      const resJSON = await response.json();

      setDropDown(resJSON.result);
    } else {
      setDropDown([]);
    }
  };

  return (
    <>
      <div className="container mx-auto my-5 sm:px-15 px-10">
        <h1 className="text-3xl font-semibold mb-6">Search</h1>
        <input
          name="query"
          onChange={onDropDown}
          type="text"
          placeholder="Search products"
          className="w-full border border-gray-300 px-4 py-2 "
        />

        <div className="  p-4">
          {dropDown?.map((result) => (
            <ul
              key={result._id}
              className="  flex justify-between items-center  bg-slate-400/10 space-y-1 p-2"
            >
              <li>{result.name}</li>
              <li>{result.price}</li>
              <li>{result.quantity}</li>
            </ul>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-5 sm:px-15 px-10">
        <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

        <form className="space-y-5">
          <input
            value={productForm?.name || ""}
            name="name"
            placeholder="Enter your product name"
            onChange={handleChange}
            type="text"
            id="name"
            className="w-full border border-gray-300 px-4 py-2"
          />
          <input
            value={productForm?.price || ""}
            name="price"
            placeholder="Enter your product price"
            onChange={handleChange}
            type="text"
            id="price"
            className="w-full border border-gray-300 px-4 py-2"
          />

          {/* Product Quantity input */}
          <input
            value={productForm?.quantity || ""}
            name="quantity"
            placeholder="Enter your product quantity"
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

      <div className="container mx-auto mt-5 sm:px-15 px-10">
        <h1 className="text-3xl font-semibold mb-6">Product Stock</h1>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className=" text-cEnter">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr className=" text-cEnter" key={product.name}>
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
