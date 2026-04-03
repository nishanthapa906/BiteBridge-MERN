import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import { useNavigate } from "react-router-dom";
function Profile() {
  const { state, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(state.userInfo?.user);
  return (
    <div className=" w-[50vw]  m-auto my-20 flex gap-8 bg-white rounded-2xl shadow-2xl shadow-gray-800">
      <div className="w-96">
        <img
          className="rounded-2xl"
          src={`http://localhost:9000/image/${state.userInfo?.user?.image}`}
          alt=""
        />
      </div>
      <div className="text-2xl pt-10 font-serif   space-y-10 ">
        <h1>
          {" "}
          <span className="font-bold text-3xl">Name:-</span>{" "}
          <span className="underline italic">
            {" "}
            {state.userInfo?.user?.name}
          </span>{" "}
        </h1>
        <h1>
          {" "}
          <span className="font-bold text-3xl">Email:-</span>{" "}
          <span className="underline italic">
            {" "}
            {state.userInfo?.user?.email}
          </span>{" "}
        </h1>
        <h1>
          {" "}
          <span className="font-bold text-3xl">Role:-</span>{" "}
          <span className="underline italic">
            {" "}
            {state.userInfo?.user?.role}
          </span>{" "}
        </h1>

        <hr />
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 text-white p-4 w-72"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
