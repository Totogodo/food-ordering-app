import Image from "next/image";
import Right from "../icons/Right";

function Hero() {
  return (
    <section className="md:grid grid-cols-2 my-4">
      <div className="py-4 md:py-20 px-4">
        <h1 className="text-primary text-4xl font-semibold">
          Smak Tradycji w Nowoczesnej Odsłonie
        </h1>
        <p className="my-8 text-secondary text-sm">
          Poznaj niepowtarzalny świat japońskiego sushi, gdzie każde danie
          opowiada historię smaku, jakości i kunsztu. Odkryj z nami prawdziwą
          esencję sushi.
        </p>
        <div className="flex gap-2 text-sm">
          <button className="flex justify-center gap-2 bg-primary uppercase text-light px-8 py-2 rounded-full items-center">
            Zamów
            <Right />
          </button>
          <button className="justify-center text-secondary font-semibold flex gap-2 px-8 py-2 rounded-full items-center">
            Więcej
            <Right />
          </button>
        </div>
      </div>
      <div className="relative md:block hidden">
        <Image src="/sushi2.png" objectFit="contain" layout="fill" alt="" />
      </div>
    </section>
  );
}

export default Hero;
