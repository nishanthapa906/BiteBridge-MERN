import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
const baseUrl = `${API_BASE_URL}/api/product`;
function Home() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate()

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


  useEffect(() => {
    getProduct();
  }, []);
  return (
    <main>
      <section className="  p-10  text-right" >
        <NavLink className=' bg-amber-400 p-5 mt-4   text-3xl font-bold underline' to='/createProduct'  >Create Product</NavLink>
      </section>

      <section className="  font-serif text-2xl  product_List  p-10  text-center ">
        <div>
          <h1 className="text-5xl underline my-5">Product List</h1>
        </div>
        <div className=" p-5 flex justify-center">
          {products?.length > 0 ? (
            <div className="">
              <table className=" ">
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
                            src={`${API_BASE_URL}/image/${item?.image}`}
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
                              navigate('/editProduct', { state: item })

                            }}


                            className="bg-orange-500 p-2 text-white rounded-xl  w-20  ">
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
