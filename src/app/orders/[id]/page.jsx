"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import ProfileTabs from "../../../components/ProfileTabs"
import Image from "next/image"
import { useParams } from "next/navigation";
import {cartProductPrice} from "../../../components/Provider"

export default function Page() {
    const {id} = useParams()
    const s = useSession()

    const [isAdmin , setIsAdmin]= useState(false)
    const [cart , setCart] = useState([])
    const [city , setCity]= useState("")
    const [street , setStreet]= useState("")
    const [code , setCode]= useState("")
    let total=0
    for (const p in cart){
        total +=cartProductPrice(cart[p].product)
    }
    useEffect(() => {
        fetch('/api/profile').then(response => {
            response.json().then(data => {
          setIsAdmin(data.admin);
        })
      });

  }, []);
  useEffect(() => {
    fetch('/api/orders').then(response => {
        response.json().then(data => {
            const order = data.find(i => i.id ===id)
            setCart(order.cartProducts)
            setCity(order.city)
            setCode(order.code)
            setStreet(order.street)
    })
  });

}, []);

  return (
    <section className="my-8">
                <ProfileTabs isAdmin={isAdmin} />

        
               <div className="mt-4 grid gap-4 md:grid-cols-2 grid-cols-1">
    <div>     

        
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
            <input type="text" placeholder="City" value={city}  />
            <div className="flex gap-2">
            <input type="text" placeholder="Street" value={street} />
            <input type="text" placeholder="Code" value={code} />

            </div>
                    </form>
                </div>
    </div>

                        </section>
  )
}
