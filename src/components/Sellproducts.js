import React, { useContext, useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../utils/Firebase";
import { store } from "../utils/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import userContext from "../utils/usecontext";
import { useNavigate } from "react-router-dom";
import productValidator from "../utils/productValidator";

const Sellproducts = () => {
  const logind = useContext(userContext);
  const navigate = useNavigate();

  const brand = useRef();

  const year = useRef();

  const title = useRef();

  const state = useRef();

  const description = useRef();
  const [image, setImage] = useState();

  const price = useRef();
  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //imageRef.current.files[0];

  const dbcollec = collection(store, "products");

  const addItem = async () => {
    const valresult = productValidator(description.current.value);
    console.log(valresult);
    if (valresult != null) {
      setWarning(valresult);
    } else {
      if (!image) {
        alert("Please select an image");
        return;
      }

      try {
        const storageRef = ref(storage, `files/${Date.now()}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        console.log("Image uploaded successfully, URL:", imageUrl);

        const date = new Date();

        const doc = await addDoc(dbcollec, {
          brand: brand.current.value,
          year: year.current.value,
          title: title.current.value,
          address: state.current.value,
          description: description.current.value,
          price: price.current.value,
          image: imageUrl,
          seller: logind.isLoggedin,
          dateposted: date.toLocaleDateString(),
        });
        navigate("/");
        alert("Product added successfully!" + doc.id);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  return (
    <div className="flex justify-center mb-10">
      <div className="flex flex-col mt-10 rounded-md w-5/12 bg-white shadow-md">
        <h1 className="font-semibold text-xl p-5 border-b border-gray-300">
          POST YOUR PRODUCT
        </h1>
        <h1 className="font-semibold text-xl p-5">INCLUDE SOME DETAILS</h1>
        <div className="px-5 pb-5 border-b border-gray-300">
          <div className="mb-5">
            <label className="block mb-2 font-medium">Brand*</label>
            <input
              ref={brand}
              type="text"
              placeholder="Brand"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium">Year*</label>
            <input
              ref={year}
              type="text"
              placeholder="Year"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium">Add Title</label>
            <input
              ref={title}
              type="text"
              placeholder="Add Title"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium">Address*</label>
            <input
              ref={state}
              type="text"
              placeholder="State"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium">Description*</label>
            <textarea
              ref={description}
              placeholder="Description"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <h1 className="font-semibold text-xl p-5">SET A PRICE</h1>
        <div className="px-5 pb-5 border-b border-gray-300">
          <label className="block mb-2 font-medium">Price*</label>
          <input
            ref={price}
            type="number"
            placeholder="Price"
            className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none focus:border-blue-500"
          />
        </div>
        <h1 className="font-semibold text-xl p-5">ADD IMAGES</h1>
        <input
          type="file"
          className=""
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <div className="px-5 pb-5 border-b border-gray-300"></div>
        {warning !== "" && (
          <h1 className="text-center text-red-500 mt-4 mb-4">{warning}</h1>
        )}
        <button
          className="m-6 bg-blue-500 px-5 py-3 rounded-md text-white font-semibold hover:bg-blue-700 transition duration-300"
          onClick={addItem}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Sellproducts;
