"use client";
import Image from 'next/image'
import MenuItem from './MenuItem'
import { useEffect, useState } from 'react';
import Link from "next/link"
export default function Menu() {
    const [items , setItems] = useState([])
    useEffect(()=>{
        fetch("/api/menu-items").then(data =>{
            data.json().then(item=>{
                const last3 = item.slice(-3)
                setItems(last3)    
            })
        })
    },[])
  return (
    <section className=''>
        <div className='absolute left-0 right-0 w-full justify-start '>

        <div className="absolute left-0 text-left -top-[70px] -z-10">
            <Image src={"/sallad1.png"} alt='salad' width={109} height={189}/>
        </div>
        <div className=" absolute right-0 -top-36 -z-10 ">
            <Image src={"/sallad2.png"} alt='salad' width={107} height={195}/>
        </div>
        </div>
        <div className="text-center">
            <h3 className="uppercase text-gray-400 font-semibold">Check Out</h3>
            <h2 className="text-red-600 font-bold text-4xl">TOP ITEM</h2>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
            {items.length > 0 && items.map(item =>(

            <MenuItem key={item.id} item={item} />
            ))}

        </div>
        <Link className="button" href={"/menu"} >Show all Item</Link>

    </section>
  )
}
