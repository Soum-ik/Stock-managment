const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  let data = await response.json();
  if (data.success) {
    return data.result;
  } else {
    return { success: false };
  }
};
const GetData = async () => {
  const products = await fetchProducts();

  return (
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
  );
};
export default GetData;
