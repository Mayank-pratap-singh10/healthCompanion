import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                 <img className='mb-5 h-8 w-8' src={assets.Main_Logo} alt="logo" /> 
                 <h1 className='w-full  md:w-2/3 text-gray-600 leading-6'>Health Companion</h1>
                 <p>this is the extra test which is because of the unnecessary thing</p>

            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Lets Connect!</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 8218816909</li>
                    <li>mailto:mayankpratapsinghofficial.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© 2024 Health Companion. All rights reserved.</p>
        </div>
      
    </div>
  )
}

export default Footer
