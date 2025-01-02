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
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Left-Aligned Image */}
          <div
            className={`w-full md:w-1/2 flex justify-center md:justify-start transform transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <img
              src="/aboutus-removebg-preview.png"
              alt="About Us"
              className="w-full md:w-auto max-w-md h-auto object-contain"
            />
          </div>

          {/* Right-Aligned Text and Button */}
          <div
            className={`w-full md:w-1/2 transform transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-4/5">
              LearnSyntax Online Learning
            </h2>
            <p className="md:w-3/4 text-md text-neutralGrey mb-8">
              LearnSyntax is an innovative online learning platform focused on
              delivering high-quality programming and technical education to
              learners of all levels. The content strategy is designed to
              engage, educate, and empower users, fostering a community of
              aspiring and seasoned developers.
            </p>
            <button className="btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
