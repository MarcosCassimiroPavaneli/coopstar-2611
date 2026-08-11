import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { PriceTable } from "./components/sections/PriceTable";
import { Process } from "./components/sections/Process";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="inicio">
        <Hero />
        <About />
        <Services />
        <PriceTable />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
