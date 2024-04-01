import Image from "next/image"
import Link from "next/link"
import RightArrow from "./icons/rightArrow"
const Hero = () => {
  return (
    <section className="hero">
        <div className="py-12">

        <h1 className="text-4xl font-semibold">Savor the Flavor: Artisanal Pizzas &nbsp; <span className="text-red-600">Made with Passion</span></h1>
        <p className="my-6 text-gray-400 text-sm">Indulge in a culinary journey like no other with our exquisite range of artisanal pizzas meticulously crafted to tantalize your taste buds. each pizza is a symphony of flavors.</p>
        <div className="flex gap-4 mt-4 text-sm">
        <Link href={"/menu"} className="uppercase items-center flex gap-2 bg-red-600 text-white px-8 py-2 rounded-full">Order Now <RightArrow /></Link>
        <Link href={"#about"} className="flex py-2 gap-2 items-center  text-gray-600 font-semibold" >learn more <RightArrow /></Link>
        </div>
        </div>
        <div className="relative md:block hidden ">

        <Image src="/pizza.png" alt="pizza" layout="fill" objectFit="contain" />
        </div>
    </section>
  )
}

export default Hero