"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [productForm, setProductForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [products, setProducts] = useState([]);
  const [dropDown, setDropDown] = useState([]);
  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      let data = await response.json();
      setProducts(data.result);
    };
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productForm.name || !productForm.price || !productForm.quantity) {
      alert("Please fill in all the required fields");
      return;
    }

    try {
      setBtnSubmit(true);
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
        setBtnSubmit(false);
      } else {
        alert("Failed to add product. Please try again.");
        setBtnSubmit(false);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    let value = e.target.value;

    if (value.length > 3) {
      setLoading(true);
      setDropDown([]);
      const response = await fetch(
        `http://localhost:3000/api/search?query=${value}`
      );
      let rjson = await response.json();
      setDropDown(rjson.result);
      setLoading(false);
    } else {
      setDropDown([]);
    }
  };

  const buttonAction = async (action, name, initialQuantity) => {
    let index = products.findIndex((item) => item.name == name);
    let newProducts = JSON.parse(JSON.stringify(products));
    if (action == "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }
    setProducts(newProducts);

    // Immediately change the quantity of the product with given name in Dropdown
    let indexdrop = dropDown.findIndex((item) => item.name == name);
    let newDropdown = JSON.parse(JSON.stringify(dropDown));
    if (action == "plus") {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1;
    } else {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropDown(newDropdown);

    setLoadingAction(true);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, name, initialQuantity }),
    });
    let r = await response.json();
    setLoadingAction(false);
  };

  return (
    <>
      <div className="container mx-auto my-5 sm:px-15 px-10">
        <h1 className="text-3xl font-semibold mb-6">Search</h1>
        <input
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
          <div
            key={result._id}
            className="bg-slate-400/10 px-2 py-1 mt-2 rounded-md text-center"
          >
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
                  onClick={() =>
                    buttonAction("minus", result.name, result.quantity)
                  }
                  disabled={loadingAction}
                  className=" bg-blue-700 disabled:bg-blue-400  px-3 py-1 rounded-2xl text-white cursor-pointer"
                >
                  -
                </button>
                <li className=" bg-white text-[19px]">{result.quantity}</li>
                <button
                  onClick={() =>
                    buttonAction("plus", result.name, result.quantity)
                  }
                  disabled={loadingAction}
                  className=" cursor-pointer bg-blue-700 disabled:bg-blue-400  px-3 py-1 rounded-2xl text-white"
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
            disabled={btnSubmit}
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
              <tr className="text-left" key={product._id}>
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
