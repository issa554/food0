'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';


export const cartContext = createContext()
export function cartProductPrice(cartProduct) {
  let price = cartProduct.price;
  if (cartProduct.sizes[0]) {

    price += cartProduct.sizes[0]?.sizePrice;
  }
  return price;
}
const Provider= ({ children }) => {
  const [cart , setCart] = useState([])
  const ls = typeof window !=="undefined" ? window.localStorage : null;

  function saveCart (carts){
    if(ls){
      ls.setItem("cart" , JSON.stringify(carts))
    }
  }
  useEffect(()=>{
    if(ls && ls.getItem("cart")){
      setCart(JSON.parse(ls.getItem("cart")))
    }
  },[])
  function addToCart(product , size=null){
    setCart(prev =>{
      const newCart = [...prev, { product, size }];
      saveCart(newCart)
      return newCart
    })
  }
  function removeProduct(indexToRemove){
    setCart(prev =>{
      const newCart = prev.filter((v,index)=> index !== indexToRemove)
      saveCart(newCart)
      return newCart
    })
  }
  function clear(){
    setCart([])
    saveCart([])
  }
  return <SessionProvider>
    <cartContext.Provider value={{
      cart , setCart,addToCart,removeProduct,clear
      }}>

    {children}
    </cartContext.Provider>
    </SessionProvider>;
};

export default Provider;