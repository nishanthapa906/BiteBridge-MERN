import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
const baseUrl = `${API_BASE_URL}/api/user`;
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
        userInfo: action.payload,
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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const loginUser = async (email, password) => {
    // todo
    // 1. Post email and password to backend login api
    // 2. Check if login is success
    // 3. Dispatch to state and redirect to home if success
    // 4. Alert server message
    
    try {
      let res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        res = await res.json();
        alert(res.message);
        if (res.success || res.status === 200) {
          dispatch({ type: "login", payload: res });
          navigate("/");
        }
      } else {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Something went wrong on server!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to server!");
    }
  };


  const getMe = async () => {
    // todo
    // 1. fetch user info from getMe api
    // 2. Dispatch that info to reducer to update state
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
    // todo
    // 1. Clear cookie from backend via logout api
    // 2. Dispatch null to remove user from state
    try {
      let res = await fetch(`${baseUrl}/logout`, {
        method: "GET",
        credentials: "include",
      });
      res = await res.json();
      console.log(res);
      dispatch({ type: "getMe", payload: null });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ state, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
