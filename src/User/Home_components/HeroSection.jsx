import React from 'react';
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";

const HeroSection = () => {
    const [inView, setInView] = useState(false);
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setInView(true);
            }
          },
          { threshold: 0.4 } // Trigger when 20% of the section is visible
        );
    
        const heroSection = document.getElementById("herosection");
        if (heroSection) {
          observer.observe(heroSection);
        }
    
        return () => {
          if (heroSection) {
            observer.unobserve(heroSection);
          }
        };
      }, []);
    return (
        <div className="bg-neutralSilver" id="herosection">
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
        <Carousel className="w-full h-full">
            {/* First Slide */}
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 w-full h-full">
                {/* Right-Aligned Image */}
                <div className={`w-full md:w-1/2 flex justify-center transform transition-all duration-1000
                    ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                    <img src="/banner-removebg.png" alt="Banner" className="w-auto max-w-full h-auto mx-2 object-contain" />
                </div>

                {/* Left Content */}
                <div className={`md:w-1/2 text-center md:text-left transform transition-all duration-1000
                     ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                    <h1 className="text-5xl font-semibold  mb-4 text-neutralDGrey md:w-3/4  leading-snug">Welcome to <span className='text-brandPrimary'>LearnSyntax</span></h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Explore our amazing features with a modern and responsive carousel.
                    </p>
                    <button className="btn-primary">Read more</button>
                </div>
            </div>

            {/* Slide 2 */}
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 w-full h-full">
                {/* Right-Aligned Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="/banner-removebg.png" alt="Banner" className="w-auto max-w-full h-auto mx-2 object-contain" />
                </div>

                {/* Left Content */}
                <div className=" md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-semibold  mb-4 text-neutralDGrey md:w-3/4  leading-snug">Explore our <span className='text-brandPrimary'>Courses</span></h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Explore our amazing features with a modern and responsive carousel.
                    </p>
                    <button className="btn-primary">Explore</button>
                </div>
                </div>

            {/* Slide 3 */}
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 w-full h-full">
                {/* Right-Aligned Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="/banner-removebg.png" alt="Banner" className="w-auto max-w-full h-auto mx-2 object-contain" />
                </div>

                {/* Left Content */}
                <div className=" md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-semibold  mb-4 text-neutralDGrey md:w-3/4  leading-snug">Learn from the <span className='text-brandPrimary'>Best of minds</span></h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Explore our amazing features with a modern and responsive carousel.
                    </p>
                    <button className="btn-primary">Purchase</button>
                </div>
                </div>
        </Carousel>
    </div>
</div>

    );

}
export default HeroSection;