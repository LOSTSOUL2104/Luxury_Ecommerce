import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex flex-col sm:flex-row overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        <div className="text-[#414141] space-y-8 max-w-xl relative z-10">
          <div className="flex items-center gap-3 animate-fade-in">
            <p className="w-12 md:w-16 h-[2px] bg-gradient-to-r from-[#414141] to-gray-300"></p>
            <p className="font-medium text-sm md:text-base tracking-wider text-gray-600">
              OUR BESTSELLERS
            </p>
          </div>
          <div className="space-y-4">
            <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight animate-slide-up text-gray-800">
              Latest Arrivals
            </h1>
            <p className="text-gray-600 text-lg md:text-xl animate-fade-in-delay max-w-lg">
              Discover our newest collection of premium products, crafted with
              excellence and style.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-4 animate-fade-in-delay-2">
            <button className="group relative bg-[#414141] text-white px-8 py-3 rounded-sm hover:bg-[#2a2a2a] transition-all duration-300 text-sm md:text-base tracking-wider border border-[#2a2a2a] overflow-hidden">
              <span className="relative z-10">SHOP NOW</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <p className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-[#414141] to-transparent"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-gray-100/50 to-transparent z-10"></div>
        <div className="relative h-full">
          <div className="absolute inset-0 border-8 border-white shadow-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          <img
            className="w-full h-full object-cover object-center animate-fade-in"
            src={assets.hero_img}
            alt="Latest Collection"
          />
        </div>
        {/* Decorative Elements */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-gray-200/50"></div>
        <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-gray-200/50"></div>
      </div>
    </div>
  );
};

export default Hero;
