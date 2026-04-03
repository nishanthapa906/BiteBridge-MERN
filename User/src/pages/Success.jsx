import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [SearchParams] = useSearchParams();
  let data = JSON.parse(atob(SearchParams.get("data")));
  console.log(data);
  console.log(data.transaction_uuid);

  const updatePayment = async () => {
    let res = await fetch(
      `http://localhost:9000/api/order/updatePaymentStatus/${data.transaction_uuid}`,
      {
        method: "PUT",
      },
    );
    res = await res.json();
    console.log(res);
  };

  useEffect(() => {
    updatePayment();
  }, []);
  return (
    <div>
      <h1>Payment Success</h1>
      <h1>Rs,{data.total_amount}</h1>
    </div>
  );
}

export default Success;
