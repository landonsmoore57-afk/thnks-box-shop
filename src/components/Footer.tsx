import { Gift } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-accent" />
              <span className="font-serif text-xl font-bold">Thnks & Co.</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Premium corporate gifts, ready to ship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/shop" className="hover:text-accent transition-colors">All Products</a></li>
              <li><a href="/shop?tier=basic" className="hover:text-accent transition-colors">Basic Tier</a></li>
              <li><a href="/shop?tier=standard" className="hover:text-accent transition-colors">Standard Tier</a></li>
              <li><a href="/shop?tier=elite" className="hover:text-accent transition-colors">Elite Tier</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/resellers" className="hover:text-accent transition-colors">Become a Reseller</a></li>
              <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/shipping" className="hover:text-accent transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-accent transition-colors">Returns</a></li>
              <li><a href="/terms" className="hover:text-accent transition-colors">Terms</a></li>
              <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Thnks & Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
