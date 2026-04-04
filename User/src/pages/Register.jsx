import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
const baseUrl = `${API_BASE_URL}/api/user`;
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    // todo
    // 1. Create formData and append user details (name, email, password, image)
    // 2. Post register details to backend
    // 3. Return message and redirect to login if success
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("image", image);

    try {
      let res = await fetch(`${baseUrl}/register`, {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        res = await res.json();
        alert(res.message);
        if (res.success || res.status === 201) {
          navigate("/login");
        }
      } else {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Something went wrong with server!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to server!");
    }
  };


  return (
    <div className="flex justify-center ">
      <form
        onSubmit={(e) => {
          registerUser(e);
        }}
        className="w-125 text-xl   font-mono shadow-2xl rounded-sm  shadow-black  space-y-4  mt-10     p-12  "
      >
        <div>
          <label htmlFor="userName">
            Name:
            <br />
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border   outline-none rounded-2xl p-3 w-full"
              id="userName"
              type="text"
              placeholder="Enter Name...."
            />
          </label>
        </div>

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
              type="password"
              placeholder="Enter Password...."
            />
          </label>
        </div>

        <div>
          <label htmlFor="userImage">
            Image:
            <br />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="border   outline-none rounded-2xl p-3 w-full"
              id="userImage"
              type="file"
              placeholder="Select image...."
            />
          </label>
        </div>

        <button className="bg-orange-500 text-white w-full p-4   font-bold ">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
