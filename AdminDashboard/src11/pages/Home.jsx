import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:9000/api/product";
function Home() {
  const navigate = useNavigate();


  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const getProduct = async () => {
    let res = await fetch(`${baseUrl}/getProduct`);
    res = await res.json();
    setProducts(res.product);
  };

  const deleteProduct = async (id) => {
    let res = await fetch(`${baseUrl}/deleteProduct/${id}`, {
      method: "DELETE",
    });
    res = await res.json();
    console.log(res);
    alert(res.message);
    getProduct();
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    // Api call
    let res = await fetch(`${baseUrl}/createProduct`, {
      method: "POST",
      body: formData,
    });
    res = await res.json();
    console.log(res);
    alert(res.message);
    getProduct();
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <main>
      <section>
        <form
          onSubmit={(e) => {
            createProduct(e);
          }}
          className="  flex flex-col text-xl  font-serif  gap-y-5  items-center w-[600px]  p-10 m-auto mt-10 shadow-2xl shadow-black  rounded-2xl "
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

      <section className="  font-serif text-2xl  product_List  p-10  text-center ">
        <div>
          <h1 className="text-5xl underline my-5">Product List</h1>
        </div>
        <div className=" p-5 flex justify-center">
          {products?.length > 0 ? (
            <div className="">
              <table className="  w-375 ">
                <thead>
                  <tr className="border">
                    <th className="border   p-5 w-44 bg-gray-500 text-white  font-bold text-2xl  ">
                      Id
                    </th>
                    <th className="border   p-5 w-44 bg-gray-500 text-white  font-bold text-2xl  ">
                      Image
                    </th>
                    <th className="border   p-5 w-44 bg-gray-500 text-white  font-bold text-2xl  ">
                      Title
                    </th>
                    <th className="border   p-5 w-44 bg-gray-500 text-white  font-bold text-2xl  ">
                      Price
                    </th>
                    <th className="border   p-5 w-44 bg-gray-500 text-white  font-bold text-2xl  ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((item) => {
                    return (
                      <tr key={item._id} className="bg-gray-100  border ">
                        <td className="p-5       text-black text-md   w-44">
                          {item._id}
                        </td>
                        <td className="p-5       text-black text-md   w-44">
                          <img
                            width={90}
                            src={`http://localhost:9000/image/${item?.image}`}
                            alt="Product_image"
                          />
                        </td>
                        <td className="p-5      text-black text-md   w-44">
                          {item.title}
                        </td>
                        <td className="p-5   text-black text-md   w-44">
                          Rs.{item.price}
                        </td>
                        <td className=" space-x-3  ">
                          <button
                            onClick={() => {
                              deleteProduct(item._id);
                            }}
                            className="bg-red-500 p-2 text-white rounded-xl  w-20  "
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              navigate('/editProduct', { state: item }); // Use the lowercase 'navigate' variable
                            }}
                            className="bg-orange-500 p-2 text-white rounded-xl w-20"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <h1> Product Not Found</h1>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
