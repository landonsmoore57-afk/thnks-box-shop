import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import FeaturedProducts from "@/components/FeaturedProducts";
import TierExplainer from "@/components/TierExplainer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ValueProps />
        <FeaturedProducts />
        <TierExplainer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
