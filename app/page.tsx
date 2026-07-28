import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Products from "@/components/Products";
import QuoteBanner from "@/components/QuoteBanner";
import Lifestyle from "@/components/Lifestyle";
import Contact from "@/components/Contact";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Products />
        <QuoteBanner />
        <Lifestyle />
        <Contact />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
