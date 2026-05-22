import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-sky-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
        <img className='w-full md:max-w-[360px] rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300' src={assets.about_image} alt="About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm leading-relaxed'>
          <p>Welcome to <strong>Health Companion</strong>, your trusted partner in managing your healthcare needs seamlessly and efficiently. We understand the challenges of finding the right doctor and scheduling appointments, which is why we’ve built a platform that simplifies the process for everyone.</p>
          <p>Our mission is to empower patients by giving them direct, transparent access to a network of highly qualified specialists. Whether you need a general physician, a cardiologist, or a dermatologist, Health Companion connects you with the care you deserve instantly.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>To create a healthier, more connected world where medical care is just a click away. We envision a future where patient-doctor synergy is optimized, reducing waiting times and ensuring that preventive care is prioritized.</p>
        </div>
      </div>

      <div className='text-xl my-4 text-gray-800 font-medium'>
        <p>WHY <span className='text-sky-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-sky-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl shadow-sm hover:shadow-lg border-gray-100 group'>
          <b className='text-gray-800 group-hover:text-white transition-all duration-300'>EFFICIENCY:</b>
          <p className='group-hover:text-sky-100 transition-all duration-300'>Streamlined appointment booking and hassle-free scheduling tailored to your busy routine.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-sky-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl shadow-sm hover:shadow-lg border-gray-100 group'>
          <b className='text-gray-800 group-hover:text-white transition-all duration-300'>CONVENIENCE:</b>
          <p className='group-hover:text-sky-100 transition-all duration-300'>Access to a robust network of trusted healthcare professionals right in your locality.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-sky-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl shadow-sm hover:shadow-lg border-gray-100 group'>
          <b className='text-gray-800 group-hover:text-white transition-all duration-300'>PERSONALIZATION:</b>
          <p className='group-hover:text-sky-100 transition-all duration-300'>Tailored medical specialist recommendations and intelligent health tracking solutions.</p>
        </div>
      </div>
    </div>
  )
}

export default About
