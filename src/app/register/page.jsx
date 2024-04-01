"use client";
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import {signIn} from "next-auth/react";



export default function Page() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [createing,setCreatieng] = useState(false)
  const [created,setCreatied] = useState(false)
  const [error,setError] = useState(false)

  async function reg(e){
    e.preventDefault();
    setCreatieng(true)
   const res = await fetch("/api/register" ,
     {method:"POST" , 
     body :JSON.stringify({email,password}),
     headers:{"Content-Type":"application/json"}
    
    }
    )
    setCreatieng(false)

    if(res.ok){
      setCreatied(true)
      setError(false)

    }else{
      setCreatied(false)

      setError(true)
    }
  }
  return (
    <section className="mt-8 text-center">
        <h1 className="text-4xl text-red-600 font-semibold">
            Register
        </h1>
        {created&& <div className=" my-4 font-semibold text-md ">
          User created ... You can now <Link className="underline" href={'/login'}  >Login &raquo;</Link>
          </div>}
        {error&& <div className=" my-4 font-bold text-2xl text-red-700">
         Error <br />try again
          </div>}
        <form className="block max-w-xs mx-auto" onSubmit={reg}>
            <input type="email" placeholder="Email" disabled={createing} value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" disabled={createing}  value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit" disabled={createing}>Register</button>
            <button type="button" onClick={() => signIn("google" , {callbackUrl: '/'})} className="mt-4 flex gap-4 justify-center"><Image src={'/google.png'} alt="google icon" width={24} height={24} />Login with google</button>
        <div className=" my-4 font-semibold text-md border-t p-2 ">
          Have Account ?  <Link className="underline" href={'/login'}  >Login &raquo;</Link>
          </div>
        </form>
    </section>
  )
}
