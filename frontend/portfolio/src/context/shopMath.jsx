import { createContext, useState } from "react";
//import { PRODUCTS } from "../products";
import product1 from "../assets/solo.jpg";
import product2 from "../assets/duos.jpg";
import product3 from "../assets/trios.jpg";
import product4 from "../assets/quads.jpg";

export const ShopContext = createContext();
const PRODUCTS = [
  {
    id: 1,
    productName: "Single",
    price: 999.0,
    productimage: product1,
    rating: "8.8/10 (23,680)",
    description: "Solo traveler? Experience a journey through the stars.",
  },
  {
    id: 2,
    productName: "Group of 2",
    price: 1799.0,
    productimage: product2,
    rating: "9.9/10 (20,453)",
    description:
      "Have a duo? This flight option might be for you. With a view of world, nothing could mess the day up.",
  },
  {
    id: 3,
    productName: "Group of 3",
    price: 2500.0,
    productimage: product3,
    rating: "9.2/10 (15,974)",
    description: "Trios? No problem.",
  },
  {
    id: 4,
    productName: "Group of 4",
    price: 3450.0,
    productimage: product4,
    rating: "9.7/10 (10,350)",
    description:
      "Is the squad traveling? whether you are a family of 4 or just friends , we got room.",
  },
];

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => getDefaultCart());

  const getTotal = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let info = PRODUCTS.find((product) => product.id === Number(item));
        total += cartItems[item] * info.price;
      }
    }
    return total;
  };
  const addToCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    console.log("yoo");
  };
  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };
  const contextValue = { cartItems, addToCart, removeFromCart, getTotal };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
