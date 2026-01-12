import { FaShieldAlt, FaBolt, FaHeartbeat } from "react-icons/fa";
import Reveal from "./Reveal";

const FeaturedSection = () => {
  return (
    <section className="bg-white py-20 my-10 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-100 rounded-full blur-3xl mix-blend-multiply filter"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-100 rounded-full blur-3xl mix-blend-multiply filter"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-red-600 font-semibold tracking-wider text-sm uppercase">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Donate Blood With <span className="text-red-600">BloodCare?</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            One decision can save a life. We ensure a safe, fast, and transparent process for every hero.
          </p>
        </div>

        <Reveal width="100%">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<FaShieldAlt />} 
                title="Verified & Safe" 
                desc="All donation requests are verified to ensure safety and trust for both donors and recipients."
            />
            <FeatureCard 
                icon={<FaBolt />} 
                title="Quick Process" 
                desc="Find requests nearby and confirm your donation in just a few simple, seamless steps."
            />
            <FeatureCard 
                icon={<FaHeartbeat />} 
                title="Real-Time Updates" 
                desc="Stay informed with live donation status tracking and instant notifications."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-2xl mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">{title}</h3>
        <p className="text-gray-500 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default FeaturedSection;
