import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-8">About Thnks & Co.</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              We believe that great gifts start with great products, thoughtfully curated and beautifully presented.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Our Story</h2>
            <p>
              Founded with a passion for quality and attention to detail, Thnks & Co. has become a trusted partner for businesses and individuals seeking premium gift solutions. We understand that every gift tells a story, and we're here to help you tell yours with elegance and authenticity.
            </p>
            <p>
              Our curated collections span from essential kitchen tools to sophisticated accessories, each item selected for its exceptional quality and timeless appeal. We work directly with renowned brands and artisans to ensure every product meets our exacting standards.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Three-Tier Excellence</h2>
            <p>
              We pioneered our signature three-tier system to provide flexibility without compromising on quality. Whether you choose Basic, Standard, or Elite, every tier delivers exceptional value and thoughtfully selected products that reflect your appreciation and taste.
            </p>
            
            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Our Commitment</h2>
            <p>
              Quality, authenticity, and service are at the heart of everything we do. From sourcing premium products to ensuring impeccable packaging and timely delivery, we're committed to making your gifting experience seamless and memorable. Your satisfaction is our success, and we stand behind every product we offer.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
