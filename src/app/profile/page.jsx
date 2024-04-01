"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Image from "next/image"
import { useState ,useEffect} from "react"
import ProfileTabs from "../../components/ProfileTabs"
export default function Page() {
    // TODO : ADD Save Loading
    const s = useSession()
    const [name , setName]= useState(s?.data?.user?.name || "")
    const [city , setCity]= useState("")
    const [street , setStreet]= useState("")
    const [code , setCode]= useState("")
    const [isAdmin , setIsAdmin]= useState(false)
    const status = s.status
    
    async function save(e){
        e.preventDefault()
        const res = await fetch("/api/profile",{
            method:"PUT",
            headers :  {"Contant-Type" : "application/json"},
            body : JSON.stringify({name ,city , code ,street})
        })
    }

    
    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
              setName(data.name);
              setIsAdmin(data.admin);
              setCity(data.city)
              setCode(data.code)
              setStreet(data.street)
            })
          });
        }
      }, [s, status]);

    if (status === "loading") {
        return <div className="mt-8 text-center">
        <h1 className="text-4xl text-black font-semibold">
            Loading . . . . . . . . . 
        </h1></div>
    }
    if (status === "unauthenticated") {
        return redirect("/login");

    }

  return (
    <section className="mt-8 text-center">
        <ProfileTabs isAdmin={isAdmin} />
    {/* <h1 className="text-4xl text-red-600 font-semibold">
        Profile
    </h1> */}

    <div className="max-w-md mx-auto">
        <div className="flex gap-2 items-center">
<div className=" bg-gray-100 p-2 rounded-lg">

        <div className="bg-gray-300 p-3 rounded-full">
            {s.data?.user.image ? (

            <Image className="rounded-full" src={s.data?.user.image} height={80} width={80} />
            ):(
                <Image className="rounded-full" src="/user.png" height={80} width={80} />

            )}
        </div>
        <button disabled={true} className="mt-2 border-0">Edit</button>
</div>
        <form className="grow" onSubmit={save}>
            <input type="text" value={name} onChange={e=>{
                setName(e.target.value)
            }} placeholder="Full Name" />
            <input type="email" disabled={true} value={s.data?.user.email} />
            <input type="text" placeholder="City" value={city} onChange={e=>{setCity(e.target.value)}}  />
            <div className="flex gap-2">
            <input type="text" placeholder="Street" value={street} onChange={e=>{setStreet(e.target.value)}} />
            <input type="text" placeholder="Code" value={code} onChange={e=>{setCode(e.target.value)}} />

            </div>
      
            <button type="submit">Save</button>
        </form>
        </div>
    </div>
        
    </section>
  )
}
