"use client";

import React, { useState } from "react";

const AddProduct = () => {
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

  const addProduct = (e) => {
    e.preventDefault();
    // Your logic to add the product goes here
    console.log("Adding Product:", productForm);

    // Reload the page
    window.location.reload();
  };

  return (
    <div className="container mx-auto my-8 sm:px-15 px-10">
      <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

      <form
        onSubmit={addProduct}
        onClick={(e) => e.preventDefault()}
        className=" space-y-10"
      >
        <input
          value={productForm.name}
          name="name"
          onChange={handleChange}
          type="text"
          id="name"
          className="w-full border border-gray-300 px-4 py-2 "
        />
        <input
          value={productForm.price}
          name="price"
          onChange={handleChange}
          type="number"
          id="price"
          className="w-full border border-gray-300 px-4 py-2"
        />
        <input
          value={productForm.quantity}
          name="quantity"
          onChange={handleChange}
          type="number"
          id="quantity"
          className="w-full border border-gray-300 px-4 py-2"
        />

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
