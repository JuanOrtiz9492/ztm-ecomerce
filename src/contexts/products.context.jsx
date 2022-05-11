import { createContext, useState } from "react"
import SHOP_DATA from '../shop-data.json'

const ProductsContext = createContext({
  products: null,
  setProducts: () => null,
})

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = { products, setProducts };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export { ProductsContext, ProductsProvider }