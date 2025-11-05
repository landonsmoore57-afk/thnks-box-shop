import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="font-serif text-5xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including name, email address, shipping address, phone number, and payment information when you make a purchase. We also collect information about your browsing behavior and preferences when you use our website.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">How We Use Your Information</h2>
            <p>
              We use the information we collect to process your orders, communicate with you about products and services, improve our website and customer service, and send you marketing communications (with your consent). We do not sell your personal information to third parties.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Payment information is processed through secure, PCI-compliant payment gateways.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing communications. To exercise these rights, contact us at privacy@thnksco.com.
            </p>

            <h2 className="font-serif text-3xl font-semibold mb-4 mt-12">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
