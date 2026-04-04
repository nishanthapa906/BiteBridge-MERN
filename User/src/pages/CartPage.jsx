import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import {useNavigate}  from 'react-router-dom'
function CartPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
  const navigate=useNavigate()
  const { state,dispatch } = useContext(CartContext);
  const totalQuantity = state.cartItems?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  const totalPrice = state.cartItems?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  const createOrder = async () => {
    // todo
    // 1. Post order detail to backend create order api
    // 2. Clear cart if success and redirect to payment
    // 3. Handle error case
    try {
      let orderRes = await fetch(`${API_BASE_URL}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          totalItem: totalQuantity,
          totalPrice: totalPrice,
          orderItems: state?.cartItems,
        }),
      });

      if (orderRes.ok) {
        orderRes = await orderRes.json();
        alert(orderRes.message);
        console.log(orderRes.orders);
        navigate('/payment', { state: orderRes.orders })
        dispatch({ type: "clearCart" })
      } else {
        // If not ok, we still try parsing as json for error message
        const contentType = orderRes.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
           const errorData = await orderRes.json();
           alert(errorData.message || "Failed to create order");
        } else {
           alert("Server error occurred!");
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Something went wrong. Please check console for details.");
    }
  };




  return (
    <div>
      {state.cartItems?.length > 0 ? (
        <div className="flex  ">
          <div className="space-y-5 p-24">
            {state.cartItems?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex font-serif text-3xl  w-[900px]  justify-between px-10  shadow-2xl shadow-gray-400 items-center gap-x-6"
                >
                  <div className="flex items-center gap-9 ">
                    <img
                      className="w-40 h-40"
                      src={`${API_BASE_URL}/image/${item?.image}`}
                      alt=""
                    />
                    <h1>{item.title}</h1>
                  </div>
                  <div>Rs{item.price}</div>
                  <div className="flex  gap-x-6">
                    <button>-</button>
                    <h1>{item.quantity}</h1>
                    <button>+</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl  font-serif flex  flex-col justify-between text-4xl p-10  mt-20  shadow-2xl shadow-gray-700 w-[500px] h-[500px] order_summary ">
            <h1>Order Summary</h1>

            <div className=" flex justify-between p-3">
              <span>Total items</span>
              <span>{totalQuantity}</span>
            </div>
            <div className=" flex justify-between p-3">
              <span>Total</span>
              <span>Rs.{totalPrice}</span>
            </div>

            <button
              onClick={() => {
                createOrder();
              }}
              className="bg-orange-400  p-4 text-white w-full"
            >
              Order
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Cart is Empty </h1>
        </div>
      )}
    </div>
  );
}

export default CartPage;
