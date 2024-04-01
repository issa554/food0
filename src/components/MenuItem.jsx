"use client"
import { useContext, useState } from "react"
import { cartContext } from "./Provider"
import Image from "next/image"
import FlyingButton from 'react-flying-item'

export default function MenuItem({item}) {
  const {name,desctption,price,image,sizes} = item
  const {addToCart} = useContext(cartContext)
  const [selectedSize , setSelectedSize] = useState(sizes?.[0] || null)
  const [showPopup,setShowPopup] = useState(false)
  let selectPrice = price
  if(selectedSize){
    selectPrice+= parseInt(selectedSize.sizePrice)
  }
  function addCart(){
    if(showPopup){
      setTimeout(()=>{

        setShowPopup(false)
      },1000)
      addToCart(item,selectedSize)
      setSelectedSize(null)
      return;
    }
    if(sizes.length === 0){
      addToCart(item)
    }else{
      setShowPopup(true)
        }
  }
  return (
    <>
   {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div
            onClick={ev => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md">
            <div
              className="overflow-y-scroll p-2"
              style={{maxHeight:'calc(100vh - 100px)'}}>
              <Image
                src={image}
                alt={name}
                width={300} height={200}
                className="mx-auto" />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {desctption}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map(size => (
                    <label
                      key={size.id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="radio"
                        onClick={()=>{setSelectedSize(size)}}
                        checked={selectedSize?.name === size.name}
                        name="size"/>
                      {size.name} ${price + size.sizePrice}
                    </label>
                  ))}
                </div>
              )}
         
              <FlyingButton
                  targetTop="5%"
                  targetLeft="95%"
                   src={image}>
              <button
                className="bg-red-600 text-white  sticky bottom-2"
                onClick={addCart}>
                Add to Cart {selectPrice}
              </button>
                
              </FlyingButton>

              <button
                className="mt-2"
                onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    <div className='text-center bg-gray-200 p-4 rounded-lg hover:bg-white hover:shadow-md hover:shadow-gray-500 transition-all'>
      <div className="text-center">

    <img src={image} alt="pizza" className="max-h-24 block mx-auto"  />
      </div>
    <h4 className='font-semibold my-2 text-xl'>{name}</h4>
    <p className='text-gray-500 text-sm'>
       {desctption}
    </p>
    {sizes.length === 0 && (

    <FlyingButton
    targetTop="5%"
    targetLeft="95%"
    
    src={image}>
      
    <button onClick={addCart} className='bg-red-600 text-white px-8 py-2 mt-4 rounded-full'>
      Add to Cart {price}$
      </button>
    </FlyingButton>
    )}
      {sizes.length !== 0 && (
    <button onClick={addCart} className='bg-red-600 text-white px-8 py-2 mt-4 rounded-full'>
      Add to Cart (from {price}$)
      </button>
       )}
</div>
    </>
  )
}
