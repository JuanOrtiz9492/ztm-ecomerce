import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
  const cartItem = cartItems.find(({ id }) => id === productToAdd.id);
  if (cartItem) {
    return cartItems.map((item) => item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item)
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }]

}

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  cartCount: 0
})

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    const nextCartItems = addCartItem(cartItems, productToAdd);
    setCartItems(nextCartItems);
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}

export { CartContext, CartProvider }