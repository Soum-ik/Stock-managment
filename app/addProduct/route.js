"use client";

import React, { useState } from "react";

export const AddProduct = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const addProduct = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify(productForm.name, productForm.price, productForm.quantity),
    result = 
    });
  };

  return (
    <div className="container mx-auto my-8 sm:px-15 px-10">
      <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

      <form onSubmit={addProduct} className="space-y-10">
        {/* Your input fields go here */}
        <input
          value={productForm.name}
          name="name"
          onChange={handleChange}
          placeholder="add your product name"
          type="text"
          id="name"
          className="w-full border border-gray-300 px-4 py-2 "
        />
        <input
          value={productForm.price}
          name="price"
          onChange={handleChange}
          type="text"
          placeholder="price"
          id="name"
          className="w-full border border-gray-300 px-4 py-2 "
        />
        <input
          value={productForm.quantity}
          name="quantity"
          placeholder="quantity "
          onChange={handleChange}
          type="text"
          id="name"
          className="w-full border border-gray-300 px-4 py-2 "
        />
        {/* ... other input fields ... */}

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
        >
          Add Product
        </button>
      </form>

      {/* Display the submitted data */}
      {submittedData && (
        <div>
          <h1>Display data</h1>
          <ol>
            <li>Name: {submittedData.name}</li>
            <li>Price: {submittedData.price}</li>
            <li>Quantity: {submittedData.quantity}</li>
          </ol>
        </div>
      )}
    </div>
  );
};
