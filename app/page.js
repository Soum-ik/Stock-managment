"use client";

import Header from "@/components/Header";
import { useState } from "react";

const Page = () => {
  // Mock data for demonstration purposes
  const [stockData, setStockData] = useState([
    { id: 1, productName: "Product 1", price: 20, quantity: 10 },
    { id: 2, productName: "Product 2", price: 15, quantity: 5 },
    // Add more data as needed
  ]);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: 0,
    quantity: 0,
  });

  const [searchAttribute, setSearchAttribute] = useState("productName");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProduct = (event) => {
    event.preventDefault();

    // Check if any of the input fields is empty
    if (!newProduct.productName || !newProduct.price || !newProduct.quantity) {
      alert("Please fill in all fields");
      return;
    }

    // Update stockData with the new product
    setStockData((prevStockData) => [
      ...prevStockData,
      {
        id: prevStockData.length + 1,
        ...newProduct,
      },
    ]);

    // Reset the form fields
    setNewProduct({
      productName: "",
      price: 0,
      quantity: 0,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the newProduct state with the new input value
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === "price" || name === "quantity" ? parseFloat(value) : value,
    }));
  };

  const handleSearchAttributeChange = (event) => {
    setSearchAttribute(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStockData = stockData.filter((item) =>
    String(item[searchAttribute])
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <h1 className=" text-2xl my-10">Add Product</h1>

        {/* Product Form */}
        <form onSubmit={handleAddProduct} className="mb-4">
          <label htmlFor="productName" className="block text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={newProduct.productName}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
          />

          <label htmlFor="price" className="block text-gray-700 mt-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
          />

          <label htmlFor="quantity" className="block text-gray-700 mt-2">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
          />

          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>

        {/* Search Section */}
        <div className="flex items-center justify-between mb-4">
          <h1 className=" text-2xl my-10">Current Product Stock</h1>
          <div className="flex items-center">
            <label htmlFor="searchAttribute" className="mr-2">
              Search By:
            </label>
            <select
              id="searchAttribute"
              name="searchAttribute"
              value={searchAttribute}
              onChange={handleSearchAttributeChange}
              className="border rounded px-2 py-1"
            >
              <option value="productName">Product Name</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </select>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder={`Search by ${searchAttribute}`}
              className="border rounded px-2 py-1 ml-2"
            />
          </div>
        </div>

        {/* Display current product stock in a table */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredStockData.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.productName}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
