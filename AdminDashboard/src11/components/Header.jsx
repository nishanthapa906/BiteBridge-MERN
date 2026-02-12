import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="  text-2xl font-serif font-bold bg-black text-white p-8">
      <NavLink to="/">Home</NavLink>
       <NavLink to="/userManagemet">UserManagemet</NavLink>
    </div>
  );
}

export default Header;
