import { useState } from "react";
const baseUrl = "http://localhost:9000/api/user";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    // console.log(name, image, email, password);
    // api call
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
      res = await res.json();
      // console.log(res);
      alert(res.message);
      if (res.success) {
        return navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
              type="tel"
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