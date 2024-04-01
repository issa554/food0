"use client";
import Image from "next/image"
import {signIn} from "next-auth/react";

import { useState } from "react"
import Link from "next/link"
export default function Page() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [logining,setLogining] = useState(false)
  const [error,setError] = useState(false)

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLogining(true);

     await signIn('credentials', {email, password, callbackUrl: '/'});
   

    setLogining(false);
  }


  return (
    <section className="mt-8 text-center">
        <h1 className="text-4xl text-red-600 font-semibold">
            Login
        </h1>
   
        {/* {error&& <div className=" my-4 font-bold text-2xl text-red-700">
         Error <br />try again
          </div>} */}
              <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>

            <input type="email" name="email" placeholder="Email" disabled={logining}  value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" disabled={logining}   value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit" disabled={logining} >Login</button>
            <button  type="button" onClick={() => signIn("google" , {callbackUrl: '/'})} className="mt-4 flex gap-4 justify-center" ><Image src={'/google.png'} alt="google icon" width={24} height={24} />Login with google</button>
        <div className=" my-4 font-semibold text-md border-t p-2 ">
          Dont Have Account ?  <Link className="underline" href={'/register'}  >Register &raquo;</Link>
          </div>
        </form>
    </section>
  )
}
