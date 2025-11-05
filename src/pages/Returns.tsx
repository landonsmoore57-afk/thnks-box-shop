import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-8">Returns & Exchanges</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Your satisfaction is our priority. We stand behind the quality of every product we offer.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Return Policy</h2>
            <p>
              We accept returns within 30 days of delivery for most items. Products must be unused, in original packaging, and in resalable condition. Custom or personalized items are final sale unless defective.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">How to Return</h2>
            <p>
              To initiate a return, contact our customer service team at hello@thnksco.com with your order number and reason for return. We'll provide a prepaid return label and instructions for sending your items back to us.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Refunds</h2>
            <p>
              Once we receive and inspect your return, refunds are processed within 5-7 business days to your original payment method. Shipping costs are non-refundable unless the return is due to our error or a defective product.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Exchanges</h2>
            <p>
              If you'd like to exchange an item for a different size, color, or tier, contact us and we'll facilitate the exchange. Exchanges are subject to product availability.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
