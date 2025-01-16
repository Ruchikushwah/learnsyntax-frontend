import { useEffect, useState } from "react";

const AboutUs = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  return (
    <div id="about">
      <div className="px-4 md:px-8 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Left-Aligned Image */}
          <div
            className={`w-full md:w-1/2 flex justify-center md:justify-start transform transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <img
              src="/aboutus-removebg-preview.png"
              alt="About Us"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
            />
          </div>

          {/* Right-Aligned Text and Button */}
          <div
            className={`w-full md:w-1/2 transform transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-neutralDGrey font-semibold mb-4">
              LearnSyntax Online Learning
            </h2>
            <p className="text-sm sm:text-md md:text-lg text-neutralGrey mb-8 leading-relaxed">
              LearnSyntax is an innovative online learning platform focused on
              delivering high-quality programming and technical education to
              learners of all levels. The content strategy is designed to
              engage, educate, and empower users, fostering a community of
              aspiring and seasoned developers.
            </p>
            <button className="btn-primary text-sm sm:text-md px-6 py-2 sm:px-8 sm:py-3">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
