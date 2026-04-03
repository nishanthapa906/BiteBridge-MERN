import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
function Header() {
  const navigate = useNavigate();
  const { state, logout } = useContext(AuthContext);
  const { userInfo } = state;
  const userExist = userInfo?.user;

  return (
    <div className="  flex justify-between px-20  bg-black p-8  text-white text-2xl font-serif">
      <div className=" space-x-10">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/cartPage">Cart Page</NavLink>
      </div>
      <div className="group  relative ">
        {userExist ? (
          <img
            className="rounded-full h-10  w-10  "
            src={`http://localhost:9000/image/${userExist?.image}`}
            alt=""
          />
        ) : (
          <img
            className="w-10"
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt=""
          />
        )}

        <div className="hidden group-hover:flex  absolute right-1 z-50   flex-col bg-amber-900 p-4 gap-y-3">
          {userExist ? (
            <>
              <NavLink className="hover:underline" to="/profile">
                Profile
              </NavLink>
              <NavLink className="hover:underline" to="/orderHistory">
                Order History
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="hover:underline" to="/login">
                Login
              </NavLink>
              <NavLink className="hover:underline" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
