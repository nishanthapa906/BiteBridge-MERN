import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";

  // todo
  // 1. Get base64 encoded data from eSewa and decode it
  // 2. Parse that data to json
  // 3. Get transaction_uuid and update paymentStatus in backend
  // 4. Return success message and amount
  
  let dataVal = searchParams.get("data");
  let data = {};
  if (dataVal) {
    try {
      data = JSON.parse(atob(dataVal));
      console.log("eSewa Data:", data);
    } catch (e) {
      console.error("Error decoding eSewa data", e);
    }
  }

  const updatePayment = async () => {
    if (!data.transaction_uuid) return;
    try {
      let res = await fetch(
        `${API_BASE_URL}/api/order/updatePaymentStatus/${data.transaction_uuid}`,
        {
          method: "PUT",
        },
      );
      res = await res.json();
      console.log("Update status:", res);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    updatePayment();
  }, [data.transaction_uuid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-serif">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
        <div className="text-green-600 text-6xl mb-5">✔️</div>
        <h1 className="text-4xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-5">Thank you for your order.</p>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
           <p className="text-lg">Amount Paid: <span className="font-bold text-green-700">Rs. {data.total_amount}</span></p>
           <p className="text-sm text-gray-500 mt-2">Trans ID: {data.transaction_uuid}</p>
        </div>
        <a href="/" className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default Success;

