import React, { useContext, useEffect, useState } from "react";
import productContext from "../utils/productContext";
import Card from "./Card";
import { store } from "../utils/Firebase";

const Container = () => {
  console.log("mainnn containerrrrrr");
  const product = useContext(productContext);
  const search = useContext(productContext);

  const datafn = async () => {
    const productRef = store.collection("products");
    const snapshot = await productRef.get();
    const productsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    product.setProduct(productsData);
  };

  useEffect(() => {
    datafn();
  }, []);

  const [deipset, setdisp] = useState([]);

  console.log("hweloooooo");
  console.log(search.search + "this is awsom");

  if (product.product == null) return;
  let x = product.product.filter((x) => {
    return x.description.toLowerCase().includes(search.search.toLowerCase());
  });
  console.log(x);

  if (x.length < 1) {
    return <h1>Oops....No result...</h1>;
  }

  console.log(deipset);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {x.map((x) => {
        return <Card product={x} />;
      })}
    </div>
  );
};

export default Container;
