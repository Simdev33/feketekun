import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Menu from "@/components/Menu";
import Promos from "@/components/Promos";
import Legends from "@/components/Legends";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import Order from "@/components/Order";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative z-[2]">
        <Hero />
        <Marquee />
        <Menu />
        <Promos />
        <Legends />
        <Story />
        <Gallery />
        <Order />
      </main>
      <Footer />
    </>
  );
}
