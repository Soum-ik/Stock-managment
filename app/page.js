"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [productForm, setProductForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [dropDown, setDropDown] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      let data = await response.json();
      setProducts(data.result);
      // setLoading(false);
    };
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    if (!productForm.name || !productForm.price || !productForm.quantity) {
      alert("Please fill in all the required fields");
      return;
    }

    setLoading(true);
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
        setLoading(false);
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    let value = e.target.value;
    setQuery(value);
    if (value.length > 3) {
      setLoading(true);
      setDropDown([]);
      const response = await fetch(
        "http://localhost:3000/api/search?query=" + query
      );
      let rjson = await response.json();
      setDropDown(rjson.result);
      setLoading(false);
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
          onChange={onDropdownEdit}
          type="text"
          placeholder="Search products"
          className="w-full border border-gray-300 px-4 py-2 "
        />
        {loading && (
          <Image
            className="   text-center"
            src="/loading.svg"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        )}
        {dropDown?.map((result) => (
          <div className="bg-slate-400/10 px-2 py-1 mt-2 rounded-md text-center">
            <ul
              key={result._id}
              className=" m-2  text-black/50 flex justify-between items-center rounded-md bg-white/70  font-semibold border-b-2 shadow-md px-2 py-2 "
            >
              <li className="bg-white" style={{ whiteSpace: "pre-line" }}>
                <span style={{ marginRight: "20px" }}>{result.name}</span>
                <span>
                  ({result.quantity} available for {result.price})
                </span>
              </li>

              <div className=" text-center flex justify-center items-center space-x-4">
                <button
                  onClick={() => {
                    buttonAction("minus", result.name);
                  }}
                  disabled={loading}
                  className=" bg-blue-700 disabled:bg-blue-500  px-3 py-1 rounded-2xl text-white cursor-pointer"
                >
                  -
                </button>
                <li className=" bg-white text-[19px]">{result.quantity}</li>
                <button
                  onClick={() => {
                    buttonAction("minus", result.name);
                  }}
                  disabled={loading}
                  className=" cursor-pointer bg-blue-700 disabled:bg-blue-500  px-3 py-1 rounded-2xl text-white"
                >
                  +
                </button>
              </div>
            </ul>
          </div>
        ))}
      </div>

      <div className="table-fixed container mx-auto mt-5 sm:px-15 px-10">
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
            onClick={addProduct}
            type="submit"
            className={`bg-blue-900/80 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold  
              `}
          >
            {"Add product"}
          </button>
        </form>
      </div>

      <div className="container mx-auto mt-5 sm:px-15 px-10 mb-10">
        <h1 className="text-3xl font-semibold mb-6">Product Stock</h1>

        <table className="w-full border border-gray-300">
          <thead className=" rounded-md">
            <tr className=" text-left">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr className="text-left" key={product.name}>
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
