import Hero from "../components/Hero";
import Menu from "../components/Menu";
export default function Home() {
  return (
    <>
    <Hero />
    <Menu />
    
    <section className="text-center my-16" id="about">
            <h3 className="uppercase text-gray-400 font-semibold">Our Story</h3>
            <h2 className="text-red-600 font-bold text-4xl">About Us</h2>
            <div className="text-gray-500 max-w-md mx-auto mt-8 flex flex-col gap-4">

            <p >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt aliquid voluptate nam sint?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt aliquid voluptate nam sint?
            </p>
            <p >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt aliquid voluptate nam sint?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt aliquid voluptate nam sint?
            </p>
            <p >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo deserunt aliquid voluptate nam sint?
            </p>
            </div>
    </section>
    <section className="text-center my-8" id="contact">
            <h2 className="text-red-600 font-bold text-4xl">Contact Us</h2>
            <div className="text-gray-500 max-w-md mx-auto mt-8 flex flex-col gap-4">
              </div>
              <div className="mt-8">

              <a className="text-4xl" href="tel:+123456789" >
                +1 234 567 89
              </a>
              </div>
              </section>

    </>
  );
}
