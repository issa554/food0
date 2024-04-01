"use client"
import { useEffect, useState } from "react";
import ProfileTabs from "../../../../components/ProfileTabs"
import Link from "next/link"
import { useParams } from "next/navigation";
export default function Page() {
    const {id} = useParams()
    const [isAdmin , setIsAdmin]= useState(false)

    const [ item, setItem]= useState("")
    const [ desctption, setDesctption]= useState("")
    const [ image, setImage]= useState("")
    const [ price, setPrice]= useState(0)
    const [ sizes ,setSizes]= useState([])
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories , setCategories]= useState([])



    useEffect(() => {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
              setIsAdmin(data.admin);
            })
          });

      }, []);
      useEffect(() => {
        fetch('/api/categories').then(response => {
          response.json().then(data => {
            setCategories(data);
      })
    });
      },[])
    useEffect(() => {
            fetch('/api/menu-items').then(response => {
                response.json().then(data => {
                    const itemm = data.find(i => i.id ===id)
                    setItem(itemm?.name)
                    setDesctption(itemm?.desctption)
                    setImage(itemm?.image)
                    setPrice(itemm?.price)
                    setSizes(itemm?.sizes)
                    setSelectedCategory(itemm?.Category.id)
            })
          });

      }, []);

      const AddSize = ()=>{
        setSizes(oldSizes =>{
            return [...oldSizes, {name:"",sizePrice:0}]
        })
      }

      const editSize = (e , index , type)=>{
        setSizes(oldSizes =>{
          const newSize = [...oldSizes]
          newSize[index][type]=e.target.value
          return newSize
      })
      }



      const newCa =async (e)=>{
        e.preventDefault()
        // TODO : Delete createPromise and add loadding
        // TODO : redirect after

        const createPromise = new Promise(async(resolve , reject)=>{
          const res = await fetch("/api/menu-items",{
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify({id:id,name:item,desctption:desctption,image:image,price:price,sizes:sizes,categoryId:selectedCategory})
      
      })
      if(res.ok){
        resolve()
      }else{
        reject()
      }
        })
        // fetchCategories()
        // setEditedCategory(null)
        // setNewName("")
        
      }



      if(!isAdmin ){
        return ;

      }

     
  return (
    <section className="mt-8 max-w-lg mx-auto">
        <ProfileTabs isAdmin={isAdmin} />
        <div className="mt-8">
        <Link className="button" href={"/menu-items"} >Show all Item</Link>
        </div>
    <div className="mt-8 max-w-md mx-auto">
        <form action="" className="grow" onSubmit={newCa}>
        <select name="categories" id="categories" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
        <input type="text" placeholder="Item Name" value={item} onChange={e=>{setItem(e.target.value)}} />
            <input type="text" placeholder="Desctption" value={desctption} onChange={e=>{setDesctption(e.target.value)}} />
            <input type="text" placeholder="Image url" value={image} onChange={e=>{setImage(e.target.value)}} />
            <input type="number" placeholder="Price" value={price} onChange={e=>{setPrice(parseFloat(e.target.value))}} />
            <div className="bg-gray-200 p-2 rounded-md mb-2">
                <label>Sizes</label>
                {sizes.length > 0 && sizes.map((s,index) =>(
                    <div key={index} className="flex items-end gap-2">
                      <div>
                        <label >Size Name</label>
                        <input
                         type="text" 
                        value={s.name}
                        onChange={e =>{editSize(e,index,"name")}}
                         />
                      </div>
                      <div>
                        <label>Size Price</label>
                        <input type="number" value={s.sizePrice} 
                        onChange={e =>{editSize(e,index,"sizePrice")}}

                        />
                      </div>
                      <div>


                      </div>
                    </div>
                ))}
                <button 
                type="button"
                onClick={AddSize}
                className="bg-white ">Add Size</button>
            </div>
            <button type="submit">Save</button>
        </form>
   
    </div>
   
  
    </section>
  )
}
