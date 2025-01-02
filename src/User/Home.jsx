import React, { useEffect, useState } from 'react'
import "../App.css";

import CourseCard from './CourseCard';
import WhatWeOffer from './Home_components/WhatWeOffer';
import Testimonial from './Home_components/Testimonial';
import ContactForm from './Home_components/ContatctForm';
import HeroSection from './Home_components/HeroSection';
import AboutUs from './Home_components/AboutUs';
import CompanyStats from './Home_components/CompanyStats';

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      let url = `${APP_URL}/api/courses`;
      const response = await fetch(url);
      const data = await response.json();
      setCourses(data.data);
    }

    fetchCourses();
  }, []);
  return (
    <>
      {/*  hero section start*/}

      {/* <div className="bg-white py-10 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
       


        <div className="md:w-1/2 space-y-4 mr-5">
          <h1 className="text-4xl md:text-3xl font-semibold text-gray-900">
            The Only way to learn a new <br></br> programming language is by
            writing programs in it.
          </h1>


          <div className="mt-6">
            <div className="flex">
              <input
                type="text"
                placeholder=""
                className="w-full md:w-2/3 p-3 border-2 border-indigo-500 rounded focus:outline-none focus:border-indigo-700 mr-2"
                />
              <a href="#_" class="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50 ">
                <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span class="relative">Search</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="\heroImage.png"
            alt="Programmer Illustration"
            className="w-3/4 md:w-full"
          />
        </div>
      </div> */}
      {/* new hero section start */}

      {/* new hero section end */}
      <HeroSection />
      {/*  hero section end*/}
      
      {/* what we offer section start */}
      <WhatWeOffer />
      {/* what we offer section end */}
      

      <div className='py-4'>
        <CourseCard courses={courses} />
      </div>

      {/* About us section start*/}
      <AboutUs />
      {/* About us section end*/}
      
      {/* testimonial section start */}
      {/* <Testimonial /> */}
      {/* testimonial section end */}

      {/* CompanyStats section start */}
      <CompanyStats />
      {/* CompanyStats section end */}

    
    </>
  );
}

export default Home