"use client";
import Image from 'next/image'
import { useEffect, useState } from 'react';
import MenuItem from '../../components/MenuItem';
export default function Menu() {
    const [items , setItems] = useState([])
    const [categories , setCategories] = useState([])
    useEffect(()=>{
        fetch("/api/menu-items").then(data =>{
            data.json().then(item=>{
                setItems(item)    
            })
        })
    },[])
    useEffect(()=>{
        fetch("/api/categories").then(data =>{
            data.json().then(item=>{
                setCategories(item)    
            })
        })
    },[])
  return (
    <section className=''>

            {categories.length > 0 && categories.map(category =>(
                <div key={category.id}>
                    <div className="text-center">


            <h2 className="text-red-600 font-bold text-4xl">{category.name}</h2>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
                {items.filter(item => item.categoryId ==category.id ) .map(it=>(

           <MenuItem key={category.id} item={it} />
           )) }
           </div>
        </div>
            ))}
        <div className="grid grid-cols-3 gap-4 mb-4">
            {/* {items.length > 0 && items.map(item =>(

            <MenuItem item={item} />
            ))} */}

        </div>
    </section>
  )
}
