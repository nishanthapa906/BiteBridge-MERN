import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className=" flex   flex-col gap-y-7  text-2xl font-serif font-bold bg-black text-white p-8">
      <NavLink to="/">Product Management</NavLink>
      <NavLink to="/userManagement">User Management</NavLink>
    </div>
  );
}

export default Header;
