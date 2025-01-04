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

      {/*  hero section start */}
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