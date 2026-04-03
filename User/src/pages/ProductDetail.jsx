import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
function ProductDetail() {
  const { state } = useLocation();
  const { dispatch } = useContext(CartContext);
  return (
    <div className="flex  w-275 shadow-2xl p-5 gap-5 shadow-gray-600 ml-56 m-10 ">
      <div className="w-100">
        <img src={`http://localhost:9000/image/${state?.image}`} alt="" />
      </div>
      <div className="text-4xl font-serif  p-8 space-y-5">
        <h1>{state.title}</h1>
        <h1>Rs.{state.price}</h1>
        <button
          onClick={() => {
            dispatch({ type: "addToCart", payload: state });
          }}
          className="bg-orange-600 text-white p-4 mt-20"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
export default ProductDetail;
