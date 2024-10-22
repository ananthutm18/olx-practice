import React, { useContext, useEffect, useState } from "react";
import productContext from "../utils/productContext";
import { store } from "../utils/Firebase";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [prod, setProd] = useState([]);
  const product = useContext(productContext);

  const datafn = async (id) => {
    const productRef = store.collection("products");
    const snapshot = await productRef.get();
    const productsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    let res = productsData.filter((x) => {
      return x.id == id;
    });
    setProd(res);
    console.log(prod);
  };

  useEffect(() => {
    datafn(id);
  }, []);
  if (prod.length < 1) {
    return <h1>Loading.......</h1>;
  }

  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex rounded-md overflow-hidden w-10/12">
        <div className="w-3/5 flex justify-center items-center bg-black max-h-96">
          <img
            src={prod[0].image}
            alt="Product"
            className="object-contain w-full max-h-96"
          />
        </div>
        <div className="w-2/5 px-4">
          <div className="flex justify-between items-center mb-4 p-4 shadow-md">
            <h1 className="text-2xl font-bold">₹ {prod[0].price}</h1>
            <div className="flex space-x-3"></div>
          </div>
          <div className="mb-4 p-4 shadow-md">
            <p className="text-gray-600 mb-4">Urgent sale</p>
            <div>
              <p className="text-gray-800">{prod[0].description}</p>
              <p className="text-gray-400 text-sm">Today</p>
            </div>
          </div>
          <div className="flex items-center mb-6 shadow-md p-4">
            <div className="bg-gray-300 rounded-full h-16 w-16 flex items-center justify-center mr-4">
              <img
                src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                alt="User"
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold">{prod[0].seller}</p>
            </div>
          </div>
          <div className="mb-6 mb-4 p-4 shadow-md">
            <h2 className="font-semibold">Posted in</h2>
            <p className="text-gray-800">{prod[0].address}</p>
          </div>

          <button className="mb-6 mb-4 p-4 shadow-md bg-blue-500 text-white w-full">
            MAKE THE DEAL
          </button>
          <div className="border-t border-gray-300 pt-4">
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
