import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import EditProduct from "./pages/EditProduct";
import UserManagement from "./pages/UserManagement";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <div className="flex"  >
      <div  className="h-[100vh] w-[400px] border  bg-black">
        <Header />
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/editProduct" element={<EditProduct />} />
          <Route path="/createProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
