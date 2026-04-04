import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

function Payment() {
  const { state } = useLocation();
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

  // todo
  // 1. Get totalPrice and _id of that order from state
  // 2. Define message for signature generation
  // 3. Use eSewa secret key (8gBm/:&EnhH.1/q) to generate hmac sha256
  // 4. Return signature in base64 format

  const Message = `total_amount=${state.totalPrice},transaction_uuid=${state._id},product_code=EPAYTEST`;
  var hash = CryptoJS.HmacSHA256(Message, "8gBm/:&EnhH.1/q");
  var signature = CryptoJS.enc.Base64.stringify(hash);

  // Auto-submit form for professional look (optional, but keep it simple for now)
  // useEffect(() => {
  //   document.getElementById("esewa-form").submit();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-serif">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl mb-5">Confirm Payment</h1>
        <p className="text-xl mb-5">Order ID: {state._id}</p>
        <p className="text-2xl font-bold text-orange-600 mb-8">Amount: Rs. {state.totalPrice}</p>
        
        <form
          id="esewa-form"
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          {/* Hidden fields for eSewa */}
          <input type="hidden" id="amount" name="amount" value={state.totalPrice} required />
          <input type="hidden" id="tax_amount" name="tax_amount" value="0" required />
          <input type="hidden" id="total_amount" name="total_amount" value={state.totalPrice} required />
          <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={state._id} required />
          <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" required />
          <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
          <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
          <input type="hidden" id="success_url" name="success_url" value={`${FRONTEND_URL}/success`} required />
          <input type="hidden" id="failure_url" name="failure_url" value={`${FRONTEND_URL}/failure`} required />
          <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
          <input type="hidden" id="signature" name="signature" value={signature} required />
          
          <button type="submit" className="bg-green-600 text-white px-10 py-4 rounded-2xl text-2xl hover:bg-green-700 transition-all">
            Pay with eSewa
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;

