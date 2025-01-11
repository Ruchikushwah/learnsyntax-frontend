import React, { useEffect, useState } from "react";
import { AiOutlinePython } from "react-icons/ai";
import { FaReact } from "react-icons/fa6";
import { IoLogoPython } from "react-icons/io5";

const WhatWeOffer = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    const serviceSection = document.getElementById("service");
    if (serviceSection) {
      observer.observe(serviceSection);
    }
    return () => {
      if (serviceSection) {
        observer.unobserve(serviceSection);
      }
    };
  }, []);
  return (
    <div id="service" className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl tracking-tight font-extrabold text-neutralDGrey  mb-2">
          Our <span className="text-brandPrimary">Courses</span>
        </h2>
        <p className="text-neutralGrey">
          LearnSyntax will enhance your learning experience the way you
          interacts
        </p>

        {/* company logo */}
        <div
          className={`my-12 flex flex-wrap justify-between items-center gap-8 transform transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
          }`}
        >
          
          <img
            src="/iconjs.png"
            alt="JavaScript"
            className="w-16 h-16 object-contain"
          />
          <img
            src="/iconpython.png"
            alt="Python"
            className="w-16 h-16 object-contain"
          />
          <img
            src="/iconreact.png"
            alt="React"
            className="w-16 h-16 object-contain"
          />
          <img
            src="/iconphp.png"
            alt="PHP"
            className="w-16 h-16 object-contain"
          />
          <img
            src="/iconjs.png"
            alt="JavaScript"
            className="w-16 h-16 object-contain"
          />
          <img
            src="/iconphp.png"
            alt="PHP"
            className="w-16 h-16 object-contain"
          />
          <img
            src="/iconpython.png"
            alt="Python"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
