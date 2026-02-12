import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import EditProduct from "./pages/EditProduct";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <div>

      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="editProduct" element={<EditProduct />} />
        <Route path="userManagement" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

export default App;
