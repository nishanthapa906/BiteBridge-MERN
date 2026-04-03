import { useState } from "react";
import { useEffect } from "react";

function OrderHistory() {
  const [orderList, setOrderList] = useState([]);

  const getMyOrder = async () => {
    try {
      let orderRes = await fetch("http://localhost:9000/api/order/get", {
        method: "GET",
        credentials: "include",
      });
      console.log(orderRes);
      if (orderRes.ok) {
        orderRes = await orderRes.json();
        // alert(orderRes);
        console.log(orderRes.orders);
        setOrderList(orderRes.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);
  return (
    <div>
      <div>
        {orderList?.length > 0 ? (
          <div className="w-[70vw]  my-10 p-5  m-auto  shadow-2xl shadow-gray-600  "  >
            {orderList?.map((item) => {
              return (
                <div key={item?._id}  className="w-full shadow-2xl p-10 text-2xl"  >
                  <h1>Payment Status:{item?.paymentStatus}</h1>
                  <h1>Total Price:Rs.{item?.totalPrice}</h1>
                  <h1>Total Items:{item?.totalItem}</h1>
                  {item?.orderItems.map((order) => {
                    return (
                      <div className="" key={order._id}  >
                        <img
                        className="w-20
                        "
                          src={`http://localhost:9000/image/${order?.image}`}
                          alt=""
                        />
                        <h1>{order?.title}</h1>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h1>Order Found </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
