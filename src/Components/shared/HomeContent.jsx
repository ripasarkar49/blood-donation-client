import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaBolt, FaShieldAlt, FaMapMarkedAlt, FaHeadset, 
  FaArrowRight, FaCalendarAlt, FaUser, FaQuoteLeft 
} from "react-icons/fa";
import SearchPage from "../../Pages/searchPage/SearchPage";

gsap.registerPlugin(ScrollTrigger);

const HomeContent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
    
      const animateSection = (selector) => {
        gsap.from(selector, {
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          clearProps: "all"
        });
      };

      animateSection(".feat-card");
      animateSection(".cat-card");
      animateSection(".step-card");
      animateSection(".req-card");
      animateSection(".test-card");
      animateSection(".blog-card");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      
      

      {/* 2. Categories Section */}
      <section className="pb-10 bg-white">
        <div className="text-center mb-12">
          <SearchPage></SearchPage>
        </div>
        <div className="w-11/12 max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
            <button key={group} className="cat-card w-24 h-24 rounded-2xl border-2 border-red-100 flex flex-col items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">
              <span className="text-2xl font-black">{group}</span>
            </button>
          ))}
        </div>
        
      </section>

      {/* 3. How It Works Section */}
      <section className="py-20 bg-red-50  text-white">
        <div className="w-11/12 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How <span className="text-red-500">It Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { no: "01", title: "Register", desc: "Sign up and create your profile." },
              { no: "02", title: "Find Donor", desc: "Search or post a public request." },
              { no: "03", title: "Save Life", desc: "Connect and get the help needed." }
            ].map((step, i) => (
              <div key={i} className="step-card space-y-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg italic">{step.no}</div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Recent Requests Section */}
      <section className="py-10 bg-gray-50">
        <div className="w-11/12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-secondary italic">Recent <span className="text-red-600">Requests</span></h2>
              <p className="text-gray-500">Urgent blood requirements near you</p>
            </div>
            <Link to="/donate-request" className="text-red-600 font-bold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="req-card bg-white p-6 rounded-3xl border border-red-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl">O+</div>
                  <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-bold">Urgent</span>
                </div>
                <h4 className="font-bold text-lg mb-1">City Hospital, Dhaka</h4>
                <p className="text-gray-500 text-sm mb-4">Needed for surgery. Contact immediately.</p>
                <button className="w-full py-3 bg-gray-100 hover:bg-red-600 hover:text-white rounded-xl font-bold transition-all">Donate Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="w-11/12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Rahat Ali", role: "Recipient", text: "Found a donor within minutes! Truly a life-saving platform." },
            { name: "Sumi Akter", role: "Donor", text: "Proud to be a donor here. The process is very smooth and transparent." }
          ].map((r, i) => (
            <div key={i} className="test-card p-10 bg-gray-50 rounded-3xl relative">
              <FaQuoteLeft className="text-red-200 text-4xl mb-4" />
              <p className="text-gray-600 mb-6 italic leading-relaxed">"{r.text}"</p>
              <h4 className="font-bold text-secondary">{r.name}</h4>
              <p className="text-xs text-red-500 font-bold uppercase">{r.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-11/12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 italic">Health <span className="text-red-600">Insights</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="blog-card bg-white rounded-3xl overflow-hidden shadow-sm group">
                <div className="h-48 bg-gray-200 overflow-hidden">
                   <img src={`https://images.unsplash.com/photo-1615461066841-6116ecaaba30?q=80&w=800`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="blog" />
                </div>
                <div className="p-6">
                  <div className="flex gap-4 text-[10px] text-gray-400 mb-3 uppercase font-bold">
                    <span className="flex items-center gap-1"><FaUser /> Admin</span>
                    <span className="flex items-center gap-1"><FaCalendarAlt /> Jan 12, 2026</span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-4 group-hover:text-red-600 transition-colors">Benefits of Regular Blood Donation</h3>
              
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;