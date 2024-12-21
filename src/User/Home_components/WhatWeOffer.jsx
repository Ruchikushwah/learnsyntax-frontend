
import React from 'react';

const WhatWeOffer = () => {

  return (

  <div id='service' className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
    <div className="text-center my-8">
      <h2 className="text-4xl tracking-tight font-extrabold text-neutralDGrey  mb-2">Our <span className='text-brandPrimary'>Courses</span></h2>
      <p className="text-neutralGrey">LearnSyntax will enhance your learning experience the way you interacts</p>

      {/* company logo */}
      <div className='my-12 flex flex-wrap justify-between items-center gap-8'>
        <img src="/iconjs.png" alt="JavaScript" className="w-16 h-16 object-contain" />
        <img src="/iconpython.png" alt="Python" className="w-16 h-16 object-contain" />
            <img src="/iconreact.png" alt="React" className="w-16 h-16 object-contain" />
            <img src="/iconphp.png" alt="PHP" className="w-16 h-16 object-contain" />
            <img src="/iconjs.png" alt="JavaScript" className="w-16 h-16 object-contain" />
            <img src="/iconphp.png" alt="PHP" className="w-16 h-16 object-contain" />
            <img src="/iconpython.png" alt="Python" className="w-16 h-16 object-contain" />
      </div>

    </div>
  </div>



  );
}

export default WhatWeOffer;