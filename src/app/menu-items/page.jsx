"use client"
import { useEffect, useState } from "react";
import ProfileTabs from "../../components/ProfileTabs"
import Link from 'next/link'
import Image from "next/image"
export default function Page() {
    const [isAdmin , setIsAdmin]= useState(false)
    const [items , setItems]= useState(false)
    useEffect(() => {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
              setIsAdmin(data.admin);
            })
          });

      }, []);
    useEffect(() => {
            fetch('/api/menu-items').then(response => {
                response.json().then(data => {
                  setItems(data);
            })
          });

      }, []);

      if(!isAdmin ){
        return ;

      }

     
  return (
    <section className="mt-8 mx-auto max-w-lg">
        <ProfileTabs isAdmin={isAdmin} />
        <div className="mt-8">
        <Link className="button" href={"/menu-items/new"} >Add new Item</Link>
        </div>

        <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          {items?.length > 0 && items.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/'+item.id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <Image
                  className="rounded-md"
                  src={item.image} alt={''} width={200} height={200} />
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
  
    </section>
  )
}
