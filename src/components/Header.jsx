"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";
import { cartContext } from "./Provider"
import { useContext } from "react";
import ShoppingCart from "./icons/ShoppingCart"
import { usePathname } from "next/navigation";
import { useState } from "react";
import Menu from "./icons/menu";

const Header = () => {
  const path = usePathname();

  const {cart} = useContext(cartContext)
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const s = useSession()
  const status = s.status
  return (
    <>
    <header className="flex items-center justify-between">
      <nav className="flex items-center  gap-8 text-gray-500 font-semibold">
      <Link className="text-red-600 font-semibold text-2xl" href={"/"}>
        M&N PIZZA
      </Link>
      <div className="hidden md:flex gap-8">

        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        {path === '/' ? (
          <>
          <Link href={"#about"}>About</Link>
          <Link href={"#contact"}>Contact</Link>
          </>
        )  : (
          <>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          </>

        )}
      </div>
      </nav>

      {status=="unauthenticated" && 
      <nav className="flex items-center  gap-8 text-gray-500 font-semibold">
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"} className="md:block hidden bg-red-600 text-white px-8 py-2 rounded-full">Register</Link>

      </nav>
}
      {status=="authenticated" && 
      <nav className="flex items-center  gap-8 text-gray-500 font-semibold">
        <Link href={"/profile"} >{s.data.user?.name?.split(" ")[0] || "profile"}</Link>
        
        <button onClick={() => signOut()} className="bg-red-600 text-white px-8 py-2 rounded-full">Logout</button>

      </nav>
}
<Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs py-1 px-1 rounded-full leading-3">
            {cart.length} 
          </span>
            )}
          </Link>
          <span className="md:hidden hover:cursor-pointer" onClick={toggleMenu}>
            <Menu />
          </span>
       
    </header>
       {isOpen && (
        <div className="mt-1 rounded-lg md:hidden">
                <div className=" w-full md:block md:w-auto" >

                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                    <li>

                    <Link href={"/"}>Home</Link>
                    </li>
                    {status=="authenticated" &&(
                        <li>

                        <Link href={"/profile"}>Profile</Link>
                        </li>
                    ) }
                  
                    <li>

                    <Link href={"/menu"}>Menu</Link>
                    </li>
                    <li>

                    <Link href={"/"}>Home</Link>
                    </li>
                    {path === '/' ? (
                      <>
                      <li>

                      <Link href={"#about"}>About</Link>
                      </li>
                      <li>

                      <Link href={"#contact"}>Contact</Link>
                      </li>
                      </>
                    )  : (
                      <>
                      <li>

                      <Link href={"/#about"}>About</Link>
                      </li>
                      <li>

                      <Link href={"/#contact"}>Contact</Link>
                      </li>
                      </>

                    )}
                  </ul>
                    

                    </div>
        </div>
      )}
      </>
  )
}

export default Header

