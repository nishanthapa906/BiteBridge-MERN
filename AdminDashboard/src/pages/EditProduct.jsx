import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
const baseUrl = `${API_BASE_URL}/api/product`;

function EditProduct() {
  const { state } = useLocation();
  //   console.log(state);
  const [title, setTitle] = useState(state.title);
  const [price, setPrice] = useState(state.price);
  const [image, setImage] = useState(null);
  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    // api call
    let res = await fetch(`${baseUrl}/updateProduct/${state._id}`, {
      method: "PUT",
      body: formData,
    });
    res = await res.json();
    console.log(res);
    alert(res.message);
  };
  return (
    <section>
      <form
        onSubmit={(e) => {
          updateProduct(e);
        }}
        className="  flex flex-col text-xl  font-serif  gap-y-5  items-center w-[600px]  p-10 m-auto mt-10 shadow-2xl shadow-black  rounded-2xl "
      >
        <div className="w-full">
          <label htmlFor="title">
            Edit Title:
            <br />
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border outline-none rounded-2xl p-3 w-full"
              type="text"
              id="title"
              placeholder="Enter Product title"
            />
          </label>
        </div>

        <div className="w-full">
          <label htmlFor="price">
            Edit Price:
            <br />
            <input
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="border outline-none rounded-2xl p-3 w-full"
              type="number"
              id="price"
              placeholder="Enter Product price"
            />
          </label>
        </div>
        <div>
          <img
            className="w-20"
            src={`${API_BASE_URL}/image/${state?.image}`}
            alt=""
          />
        </div>
        <div className="w-full">
          <label htmlFor="image">
            New Image:
            <br />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="border outline-none rounded-2xl p-3 w-full"
              type="file"
              id="image"
              placeholder="Enter Product image"
            />
          </label>
        </div>

        <div className="w-full">
          <button className="border  rounded-2xl bg-orange-600  text-white text-2xl font-serif p-4 w-full">
            Edit Product
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditProduct;
