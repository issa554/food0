"use client"
import { useEffect, useState } from "react";
import ProfileTabs from "../../components/ProfileTabs"
import Link from "next/link"
export default function Page() {
    const [isAdmin , setIsAdmin]= useState(false)
    const [users , setUsers]= useState([])


    useEffect(() => {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
              setIsAdmin(data.admin);
            })
          });

      }, []);
    useEffect(() => {
      fetchUsers()


      }, []);

      const fetchUsers = ()=>{
        fetch('/api/users').then(response => {
          response.json().then(data => {
            setUsers(data);
            
      })
    });
      }

      if(!isAdmin ){
        return ;

      }
     
  return (
    <section className="mt-8">
        <ProfileTabs isAdmin={isAdmin} />
    <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing Users : {users.length}</h2>
        {users?.length > 0 && users.map(c => (
          <div
            key={c.id}
            className="bg-gray-100 rounded-xl  px-4 flex gap-1 mb-1 items-center p-5">
            <div className="grow flex gap-12">
              <span>
                
                {c.name || "No Name"}
                </span>
              <span>
                
                {c.email}
                </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}
