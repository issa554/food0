"use client"
import { useEffect, useState } from "react";
import ProfileTabs from "../../components/ProfileTabs"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Page() {
    const [isAdmin , setIsAdmin]= useState(false)
    const [categories , setCategories]= useState([])
    const [newName , setNewName] = useState("")
    const [EditedCategory , setEditedCategory] = useState(null)


    useEffect(() => {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
              setIsAdmin(data.admin);
            })
          });

      }, []);
    useEffect(() => {
      fetchCategories()
      setEditedCategory(null)


      }, []);

      const fetchCategories = ()=>{
        fetch('/api/categories').then(response => {
          response.json().then(data => {
            setCategories(data);
      })
    });
      }

      if(!isAdmin ){
        return ;

      }

      const newCa =async (e)=>{
        e.preventDefault()
        // TODO : Delete createPromise and add loadding
        const data = {name:newName}
        if(EditedCategory){
          console.log("first")
          data.id = EditedCategory.id
        }
        console.log(data)
        const createPromise = new Promise(async(resolve , reject)=>{
          const res = await fetch("/api/categories",{
            method: EditedCategory ? "PUT" : "POST",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify(data)
      
      })
      if(res.ok){
        resolve()
      }else{
        reject()
      }
        })
        fetchCategories()
        setEditedCategory(null)
        setNewName("")
        
      }
     
  return (
    <section className="mt-8">
        <ProfileTabs isAdmin={isAdmin} />
    <div className="mt-8 max-w-md mx-auto">
        <form onSubmit={newCa}>
            <div className="flex gap-2 items-end">
                <div className="grow">
                    <label htmlFor="name"> {EditedCategory ? "Update" : "new Category"}</label>
                    <b htmlFor="name"> {EditedCategory && EditedCategory.name}</b>
                    <input type="text" name="name" value={newName} onChange={e=>{setNewName(e.target.value)}} />
                </div>
                <div className="pb-3">
                    <button type="submit">{EditedCategory ? "Update" : "Create"} </button>
                </div>
            </div>
        </form>
    </div>
    <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 && categories.map(c => (
          <div
            key={c._id}
            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
            <div className="grow">
              {c.name}
            </div>
            <div className="flex gap-1">
              <button type="button"
                      onClick={() => {
                        setEditedCategory(c);
                        setNewName(c.name);
                      }}
              >
                Edit
              </button>
              {/* <DeleteButton
                label="Delete"
                onDelete={() => handleDeleteClick(c._id)} /> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
