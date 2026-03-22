import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/adminContext'
import { useEffect } from 'react'

const DoctorsList = () => {
  const {doctors, atoken, allDoctors}= useContext(AdminContext)

  useEffect(()=>{
    if(atoken ){
      allDoctors()

    }
  },[atoken])
  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {
          doctors.map((item,index)=>(
            <div key={index}>
              <img src={item.image} alt="" />



            </div>
          ))
        }


      </div>
      
      
    </div>
  )
}

export default DoctorsList
