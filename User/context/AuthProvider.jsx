import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
const baseUrl = "http://localhost:9000/api/user";
const initialState = {
  userInfo: null,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        userInfo: action.payload,

      };
    }
    case "logout": {
      return {
        userInfo:action.payload
      };
    }
    case "getMe": {
      return {
        userInfo: action.payload,
      };
    }
  }
};
export const AuthProvider = ({ children }) => {
 const navigate= useNavigate()
  const [state, dispatch] = useReducer(authReducer, initialState);
  const loginUser = async (email, password) => {
    let res;
    try {
      res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "content-type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      res = await res.json();
      dispatch({ type: "login", payload: res });
      navigate('/')
      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getMe = async () => {
    try {
      let res = await fetch(`${baseUrl}/getMe`, {
        method: "GET",
        credentials: "include",
      });
      res = await res.json();
      dispatch({ type: "getMe", payload: res });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      let res = await fetch(`${baseUrl}/logout`, {
        method: "GET",
        credentials: "include",
      });
      res = await res.json();
      console.log(res)
      dispatch({ type: "getMe", payload: null });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ state, loginUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};