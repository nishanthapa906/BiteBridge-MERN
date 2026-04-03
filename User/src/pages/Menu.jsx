import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:9000/api/product";
function Menu() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getProduct = async () => {
    try {
      setIsLoading(true);
      let res = await fetch(`${baseUrl}/getProduct`);
      res = await res.json();
      console.log(res.product);
      setProducts(res.product);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      // console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  if (!isError && isLoading) {
    return (
      <div className="text-center mt-10  text-2xl ">Loading..............</div>
    );
  }
  return (
    <main>
      {products?.length > 0 ? (
        <div className="flex gap-5  flex-wrap   justify-center p-20">
          {products?.map((item) => {
            return (
              <div
                onClick={() => {
                  navigate("/productDetail", { state: item });
                }}
                key={item._id}
                className=" w-64  shadow-2xl rounded-2xl  "
              >
                <div>
                  <img
                    className="w-full   rounded-t-2xl h-64"
                    src={`http://localhost:9000/image/${item?.image}`}
                    alt=""
                  />
                </div>
                <div className="p-5   text-xl  font-serif ">
                  <h1>{item.title}</h1>
                  <h1>Rs.{item.price}</h1>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Product Not found</div>
      )}
    </main>
  );
}

export default Menu;
