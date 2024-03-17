import SectionHeaders from "@/components/layout/SectionHeaders";
import HomeMenu from "@/components/layout/HomeMenu";
import Hero from "@/components/layout/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center mb-4">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-secondary max-w-md mx-auto mt-4 flex flex-col gap-3">
          <p>
            Z pasji do sushi i marzeń o własnym kąciku Japonii, w 2015 r.
            otworzyliśmy nasz bar. Każdy kęs to podróż po tradycyjnych smakach
            Kraju Kwitnącej Wiśni.
          </p>
          <p>
            Z pasji do sushi i marzeń o własnym kąciku Japonii, w 2015 r.
            otworzyliśmy nasz bar. Każdy kęs to podróż po tradycyjnych smakach
            Kraju Kwitnącej Wiśni.
          </p>
          <p>
            Z pasji do sushi i marzeń o własnym kąciku Japonii, w 2015 r.
            otworzyliśmy nasz bar. Każdy kęs to podróż po tradycyjnych smakach
            Kraju Kwitnącej Wiśni.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don`t hesitate"}
          mainHeader={"Contuct us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl text-secondary underline"
            href="tel:+48799999999"
          >
            +48 799 999 999
          </a>
        </div>
      </section>
    </>
  );
}
