import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-teal to-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-display font-bold text-2xl">Thnks & Co.</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium corporate gifts, simplified. Order in minutes, make lasting impressions.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-brand-teal transition-colors">All Products</Link></li>
              <li><Link to="/shop?tier=basic" className="hover:text-brand-teal transition-colors">Basic Tier</Link></li>
              <li><Link to="/shop?tier=standard" className="hover:text-brand-teal transition-colors">Standard Tier</Link></li>
              <li><Link to="/shop?tier=elite" className="hover:text-brand-teal transition-colors">Elite Tier</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-brand-teal transition-colors">About Us</Link></li>
              <li><Link to="/resellers" className="hover:text-brand-teal transition-colors">Become a Reseller</Link></li>
              <li><Link to="/contact" className="hover:text-brand-teal transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-brand-teal transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shipping" className="hover:text-brand-teal transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-brand-teal transition-colors">Returns</Link></li>
              <li><Link to="/terms" className="hover:text-brand-teal transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Thnks & Co. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-brand-teal transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal transition-colors text-sm">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
