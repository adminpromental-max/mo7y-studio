import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import GrowthQuiz from "@/components/GrowthQuiz";
import Partners from "@/components/Partners";
import About from "@/components/About";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Services />
        <Portfolio />
        <GrowthQuiz />
        <Partners />
        <About />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
