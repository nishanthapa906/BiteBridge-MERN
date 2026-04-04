import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
const baseUrl = `${API_BASE_URL}/api/product`;

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const createProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    // Api call
    try {
      let res = await fetch(`${baseUrl}/createProduct`, {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        res = await res.json();
        console.log(res);
        if (res.status === 201 || res.success) {
          alert(res.message);
          setTitle("");
          setPrice(0);
          setImage(null);
        } else {
          alert(res.message || "Failed to create product");
        }
      } else {
        const text = await res.text();
        console.error("Server Error Response:", text);
        alert("Server returned an error. Please check console for details.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to connect to server.");
    }
  };


  return (
    <div>
      <section className="flex justify-center items-center" >
        <form
          onSubmit={(e) => {
            createProduct(e);
          }}
          className="  ml-96  flex flex-col text-xl  font-serif  gap-y-5  items-center w-[600px]  p-10 m-auto mt-10 shadow-2xl shadow-black  rounded-2xl "
        >
          <div className="w-full">
            <label htmlFor="title">
              Title:
              <br />
              <input
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
              Price:
              <br />
              <input
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
          <div className="w-full">
            <label htmlFor="image">
              Image:
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
              Create Product
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateProduct;
