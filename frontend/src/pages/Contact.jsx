import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-3xl text-center pt-12 pb-8 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-16 flex flex-col justify-center md:flex-row gap-16 mb-28">
        <div className="relative group">
          <img
            className="w-full md:max-w-[480px] rounded-lg shadow-lg transform group-hover:scale-105 transition-all duration-300"
            src={assets.contact_img}
            alt="Contact Forever"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
        </div>

        <div className="flex flex-col justify-center items-start gap-8 md:w-1/2">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full">
              <h2 className="font-semibold text-2xl text-gray-800 mb-4">
                Our Store
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="text-blue-600">📍</span>
                  India
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="text-blue-600">📞</span>
                  Tel: +91 99911
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="text-blue-600">✉️</span>
                  Email: admin@forever.com
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full">
              <h2 className="font-semibold text-2xl text-gray-800 mb-4">
                Careers at Forever
              </h2>
              <p className="text-gray-600 mb-6">
                Learn more about our teams and job openings.
              </p>
              <button className="border-2 border-black px-8 py-4 text-sm font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
