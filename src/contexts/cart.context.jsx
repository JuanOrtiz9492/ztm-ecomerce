import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
  const cartItem = cartItems.find(({ id }) => id === productToAdd.id);
  if (cartItem) {
    return cartItems.map((item) => item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item)
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }]

}

const removeCartItem = (cartItems, cartItemToRemove) => {

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}
const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0,
})

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const nextCartItems = addCartItem(cartItems, productToAdd);
    setCartItems(nextCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}

export { CartContext, CartProvider }