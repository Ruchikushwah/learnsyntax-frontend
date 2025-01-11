import React, { useEffect, useState } from 'react'
import "../App.css";

import CourseCard from './CourseCard';
import WhatWeOffer from './Home_components/WhatWeOffer';
import Testimonial from './Home_components/Testimonial';
import ContactForm from './Home_components/ContatctForm';
import HeroSection from './Home_components/HeroSection';
import AboutUs from './Home_components/AboutUs';
import CompanyStats from './Home_components/CompanyStats';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>LearnSyntax - Master Programming Languages Online</title>
        <meta name="description" content="Join LearnSyntax to explore and master programming languages like PHP, Python, React, HTML, CSS, JavaScript, and more. Start your coding journey today!" />
      </Helmet>
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