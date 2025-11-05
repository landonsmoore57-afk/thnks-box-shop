import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-8">Shipping Information</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              We ensure your gifts arrive on time and in perfect condition.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Shipping Methods</h2>
            <p>
              All orders are carefully packed and shipped via FedEx or UPS Ground. For time-sensitive deliveries, expedited shipping options are available at checkout. We ship to all 50 states and can accommodate international shipping requests on a case-by-case basis.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Processing Time</h2>
            <p>
              Standard orders typically ship within 2-3 business days. Custom orders with personalization may require 5-7 business days for processing. During peak holiday seasons, please allow additional time for fulfillment.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Shipping Costs</h2>
            <p>
              Shipping costs are calculated based on order weight, destination, and selected delivery speed. Standard shipping starts at $12 for most orders. Bulk orders and reseller accounts may qualify for discounted shipping rates.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Tracking</h2>
            <p>
              Once your order ships, you'll receive a tracking number via email. You can monitor your shipment's progress and estimated delivery date through the carrier's website.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
