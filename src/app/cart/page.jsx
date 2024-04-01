"use client"
import { useContext , useState,useEffect } from "react"
import {cartContext , cartProductPrice} from "../../components/Provider"
import { useSession } from "next-auth/react"

import Image from "next/image"
export default function Page() {
    const {cart,removeProduct , clear} =useContext(cartContext)
    let total =0;
    const s = useSession()
    const status=s.status
    const [city , setCity]= useState("")
    const [street , setStreet]= useState("")
    const [code , setCode]= useState("")
    const [email , setEmail]= useState("")
    async function order(e){
        e.preventDefault()
        const res = await fetch("/api/orders",{
            method:"POST",
            headers :  {"Contant-Type" : "application/json"},
            body : JSON.stringify({username:email , city:city , code:code ,street:street , cartProducts:cart})
        })
        clear()
    }
    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {

              setCity(data.city)
              setCode(data.code)
              setStreet(data.street)
              setEmail(data.email)
            })
          });
        }
      }, [s]);
    for (const p in cart){
        total +=cartProductPrice(cart[p].product)
    }
  return (
    
          <section className="mt-8 ">
            <div className="text-center">

        <h1 className="text-4xl text-red-600 font-semibold">
            Cart 
        </h1>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 grid-cols-1">
                <div>
                    {cart.length === 0 && (
                        <h3>
                            No Product in your cart
                        </h3>
                    )}
                    {cart.length > 0 && (cart.map((product,index) =>(
                            <div key={index} className="flex gap-4 mb-2 border-b py-2 items-center">
                                <div className="w-24">
                                    <Image src={product.product.image} alt="" width={240}   height={240}/>
                                </div>
                                <div className="grow">
                                    <h3 className="font-semibold">

                                {product.product.name}
                                    </h3>
                                    {product.product.sizes && (
                                        <div className="text-gray-500 text-sm">
                                            Size : <span>
                                                {product.product.sizes[0]?.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-lg font-semibold">
                                    {cartProductPrice(product.product)}$
                                </div>
                                <div>
                                    <button
                                    type="button"
                                    onClick={()=>{removeProduct(index)}}
                                    >Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                    <div className="py-4 text-right pr-8 font-semibold text-lg">

                Total :${total}
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>

                    Checkout
                    </h2>
                
                    <form>
            <input type="text" placeholder="City" value={city} onChange={e=>{setCity(e.target.value)}}  />
            <div className="flex gap-2">
            <input type="text" placeholder="Street" value={street} onChange={e=>{setStreet(e.target.value)}} />
            <input type="text" placeholder="Code" value={code} onChange={e=>{setCode(e.target.value)}} />

            </div>
      
                        <button type="button" disabled={cart.length === 0 || status==="unauthenticated"} onClick={order}>
                            Pay :${total}
                        </button>
                    </form>
                </div>
            </div>
    </section>
  )
}
