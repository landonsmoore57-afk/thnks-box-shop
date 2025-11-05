import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Agreement to Terms</h2>
            <p>
              By accessing or using Thnks & Co. services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Use of Service</h2>
            <p>
              Our service allows you to browse, purchase, and resell premium curated gift products. You agree to use our service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Pricing and Payment</h2>
            <p>
              All prices are in USD and subject to change without notice. We reserve the right to refuse or cancel any order for any reason. Payment must be received before orders are processed. For reseller accounts, payment terms are established in separate agreements.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are owned by Thnks & Co. and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Limitation of Liability</h2>
            <p>
              In no event shall Thnks & Co., nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
