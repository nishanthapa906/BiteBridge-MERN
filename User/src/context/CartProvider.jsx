import { createContext, useEffect, useReducer } from "react";
export const CartContext = createContext();
const getItems = () => {
  let res = localStorage.getItem("cartItem");
  return res ? JSON.parse(res) : [];
};
const initialState = {
  cartItems: getItems(),
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "addToCart": {
      const isExist = state.cartItems.find((item) => {
        return item._id == action.payload._id;
      });
      if (isExist) {
        return state;
      } else {
        const newProduct = [...state.cartItems, action.payload];

        return {
          cartItems: newProduct,
        };
      }
    }

    case "clearCart": {
      return { cartItems: [] };
    }
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
  });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
