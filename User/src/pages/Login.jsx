import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthProvider";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {  loginUser } = useContext(AuthContext);
  const loginUsers = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  };
  // console.log(state);
  return (
    <div className="flex justify-center ">
      <form
        onSubmit={(e) => {
          loginUsers(e);
        }}
        className="w-125 text-xl   font-mono shadow-2xl rounded-sm  shadow-black  space-y-4  mt-20     p-16  "
      >
        <div>
          <label htmlFor="email">
            Email:
            <br />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border   outline-none rounded-2xl p-3 w-full"
              id="email"
              type="email"
              placeholder="Enter email...."
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <br />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border   outline-none rounded-2xl p-3 w-full"
              id="password"
              type="tel"
              placeholder="Enter Password...."
            />
          </label>
        </div>
        <button className="bg-green-500 text-white w-full p-4   font-bold ">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
