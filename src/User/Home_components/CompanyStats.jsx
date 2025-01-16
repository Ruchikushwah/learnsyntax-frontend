import { useEffect, useState } from "react";
import CountUp from "react-countup";



const CompanyStats = () => {
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
    
        const statsSection = document.getElementById("stats");
        if (statsSection) {
          observer.observe(statsSection);
        }
    
        return () => {
          if (statsSection) {
            observer.unobserve(statsSection);
          }
        };
      }, []);
    return (


        <div id="stats">
            <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16" >
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Left Side: Text Content */}
                    <div className="md:w-1/2">
                        <h2 className="lg:text-4xl  text-2xl text-neutralDGrey font-semibold mb-4 md:w-3/4">
                        LearnSyntax, a platform<br />
                            <span className="text-brandPrimary lg:text-4xl text-2xl">to learn coding </span>
                        </h2>
                        <p className="text-sm sm:text-md md:text-lg text-neutralGrey">
                        LearnSyntax is designed to help everyone master coding with structured learning paths and hands-on experience.
                        </p>
                    </div>

                    {/* Right Side: Members Grid */}
                    <div className="md:w-1/2 grid grid-cols-2 gap-8">
                        {/* Member 1 */}
                        <div className="flex items-center gap-4">
                            <img src="iconreact.png" alt="Icon 1" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">{inView?<CountUp end={3204} duration={2.5}/>:"3,204+"}+</h4>
                                <p>Members</p>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div className="flex items-center gap-4">
                            <img src="iconjs.png" alt="Icon 2" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">{inView?<CountUp end={1980} duration={2.5}/>:"1,980"}+</h4>
                                <p>Members</p>
                            </div>
                        </div>

                        {/* Member 3 */}
                        <div className="flex items-center gap-4">
                            <img src="iconpython.png" alt="Icon 3" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">{inView?<CountUp end={2300} duration={2.5}/>:"2,300"}+</h4>
                                <p>Members</p>
                            </div>
                        </div>

                        {/* Member 4 */}
                        <div className="flex items-center gap-4">
                            <img src="iconphp.png" alt="Icon 4" className="w-16 h-16 object-contain" />
                            <div>
                                <h4 className="text-2xl text-neutralDGrey font-semibold">{inView?<CountUp end={1665} duration={2.5}/>:"1,665"}+</h4>
                                <p>Members</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default CompanyStats;