"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState ,useEffect} from "react"
import ProfileTabs from "../../components/ProfileTabs"
import Link from "next/link"
export default function Page() {
    // TODO : ADD Save Loading
    const s = useSession()
    const [isAdmin , setIsAdmin]= useState(false)
    const status = s.status
    const [orders , setOrders] = useState([])

    
    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
              setIsAdmin(data.admin);
            })
          });
        }
      }, [s, status]);
    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/orders').then(response => {
                response.json().then(data => {
                  setOrders(data)
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
        <div>
        <h2 className="mt-8 text-sm text-gray-500">All Orders : {orders.length}</h2>
        {orders?.length > 0 && orders.map(c => (
          <Link key={c.id} href={"/orders/"+c.id}>
          <div
            key={c.id}
            className="bg-gray-100 rounded-xl  px-4 flex gap-1 mb-1 items-center p-5">
            <div className="grow flex gap-12">
              <span>
                
                {c.username || "No Name"}
                </span>
              <span>
                
                {c.createdAt}
                </span>
            </div>

          </div>
              </Link>
        ))}
      </div>
    </section>
  )
}
