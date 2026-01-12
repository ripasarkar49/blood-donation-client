import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import bannerImage from "../assets/banner.png";

const Banner = () => {
  const bannerRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline()
        .from(".banner-title", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
        .from(".banner-text", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .from(".banner-btn", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".banner-img", {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=1");

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bannerRef} className="relative overflow-hidden rounded-3xl my-6 shadow-2xl mx-4 lg:mx-10">
      {/* Background with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-700" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-black/20" />

      {/* Shapes for decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl banner-shape"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-black/10 blur-3xl banner-shape"></div>

      <div className="relative z-10 w-11/12 mx-auto py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white">
        
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium tracking-wide banner-text">
            ❤️ Be a Hero Today
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight banner-title">
            Donate Blood, <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-100">Save Lives</span>
          </h1>

          <p className="text-red-50 text-lg md:text-xl max-w-lg leading-relaxed banner-text">
            Every drop of blood is a gift of life. Join our donor community or
            find donors near you to help those in urgent need.
          </p>

         <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/register"
            className="btn bg-white text-red-600 hover:bg-gray-100 border-none px-8 py-3 h-[48px] min-h-0 rounded-full font-bold shadow-lg banner-btn flex items-center justify-center flex-1 sm:flex-none"
          >
            Join as a Donor
          </Link>

          <Link
            to="/search-page"
            className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 h-[48px] min-h-0 rounded-full font-bold banner-btn flex items-center justify-center flex-1 sm:flex-none"
          >
            Search Donors
          </Link>
        </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end relative">
           <div className="relative banner-img">
               <div className="absolute inset-0 bg-red-600 blur-2xl opacity-30 rounded-full transform scale-90 translate-y-4"></div>
              <img
                src={bannerImage}
                alt="Blood Donation"
                className="relative z-10 max-w-sm md:max-w-md w-full drop-shadow-2xl rounded-xl transform hover:rotate-2 transition-transform duration-500"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
