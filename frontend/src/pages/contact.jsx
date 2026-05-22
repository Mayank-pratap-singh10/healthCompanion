import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-sky-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300' src={assets.contact_image} alt="Contact Us" />
        <div className='flex flex-col justify-center items-start gap-6 text-gray-600 leading-relaxed'>
          <p className='font-semibold text-lg text-gray-800'>OUR OFFICE</p>
          <p className='text-gray-500'>17th Cross, Richmond Circle<br />Ring Road, London, UK</p>
          <p className='text-gray-500'>Tel: +91 8218816909<br />Email: contact@healthcompanion.com</p>
          
        </div>
      </div>
    </div>
  )
}

export default Contact
