import React from 'react'
import {assets,specialityData} from "../assets/assets.js";
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-sky-700' id="speciality">
        <h1 className='text-3xl font-medium'>Find By Speciality</h1>
        <p className='sm:-1/3 text-center text-sm'>Explore the list of trusted doctors in available specialities <br /> Schedule your appointment today!</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item,index) => (
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-300'
                key={index} to={`/doctors/${item.speciality}`}>
                    <img src={item.image} alt="" />
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
      
    </div>
  )
}

export default SpecialityMenu
