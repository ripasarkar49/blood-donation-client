import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    // এখানে bg-secondary এর বদলে bg-[#1a1a1a] (ডার্ক গ্রে/ব্ল্যাক) ব্যবহার করা হয়েছে যাতে টেক্সট ফুটে ওঠে
    <footer className="bg-[#121212] text-gray-300 pt-16 pb-8 mt-10">
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* ===== Brand Info ===== */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg shadow-md">
               <img src={logo} className="w-8 h-8 object-contain" alt="logo" />
            </div>
            {/* BloodCare লেখাটি এখন স্পষ্টভাবে সাদা এবং লাল দেখাবে */}
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Blood<span className="text-red-600">Care</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Connecting donors with those in need. Every drop counts. Join our
            mission to save lives through safe and accessible blood donation.
          </p>
          <div className="flex gap-4 pt-2">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>
        </div>

        {/* ===== Quick Links ===== */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><FooterLink to="/" text="Home" /></li>
            <li><FooterLink to="/donate-request" text="Donation Requests" /></li>
            <li><FooterLink to="/funding" text="Funding" /></li>
            <li><FooterLink to="/dashboard" text="Dashboard" /></li>
          </ul>
        </div>

        {/* ===== Support ===== */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-lg">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><FooterLink to="#" text="Help Center" /></li>
            <li><FooterLink to="#" text="Privacy Policy" /></li>
            <li><FooterLink to="#" text="Terms & Conditions" /></li>
            <li><FooterLink to="/contact-us" text="Contact Us" /></li>
          </ul>
        </div>

        {/* ===== Newsletter ===== */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-lg">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Subscribe to our newsletter for the latest updates and success stories.
          </p>
          <form className="flex group shadow-lg">
            <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 text-sm bg-gray-800/50 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500 border border-gray-700 placeholder:text-gray-500"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-r-md transition-all duration-300 font-medium">
                Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ===== Bottom ===== */}
      <div className="border-t border-gray-800/50 mt-12 pt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} BloodCare. All rights reserved. Made with ❤️ in Dhaka.</p>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md">
        {icon}
    </a>
);

const FooterLink = ({ to, text }) => (
    <Link to={to} className="hover:text-red-500 transition-colors duration-200 block transform hover:translate-x-1">
        {text}
    </Link>
);

export default Footer;