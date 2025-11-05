import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white flex items-center justify-center">
                <span className="text-brand-navy font-bold text-xl">T</span>
              </div>
              <span className="font-display font-semibold text-2xl">Thnks & Co.</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Premium corporate gifting solutions for professionals wanting to make an impact.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-semibold mb-4">Collections</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/shop" className="hover:text-brand-gold transition-colors">All Products</Link></li>
              <li><Link to="/shop?tier=basic" className="hover:text-brand-gold transition-colors">Basic Tier</Link></li>
              <li><Link to="/shop?tier=standard" className="hover:text-brand-gold transition-colors">Standard Tier</Link></li>
              <li><Link to="/shop?tier=elite" className="hover:text-brand-gold transition-colors">Elite Tier</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/resellers" className="hover:text-brand-gold transition-colors">Partner Program</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/shipping" className="hover:text-brand-gold transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-brand-gold transition-colors">Returns</Link></li>
              <li><Link to="/terms" className="hover:text-brand-gold transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-sm text-white/50 text-center">
            &copy; {new Date().getFullYear()} Thnks & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
