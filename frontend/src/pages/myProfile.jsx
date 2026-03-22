import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios"
import {toast} from "react-toastify"

const myProfile = () => {
  const {userData,setUserData,backendUrl,token,loadUserProfileData}=useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image,setImage]=useState(false)
  
  const updateUserProfileData=async ()=>{
    try {
      const formData = new FormData()
      formData.append("name",userData.name)
      formData.append("phone",userData.phone)
      formData.append("address",userData.address)
      formData.append("gender",userData.gender)
      formData.append("dob",userData.dob)

      image && formData.append("image",image)
      const {data}  =await axios.post(backendUrl + "/api/user/update-profile",formData,{header:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }

  

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return userData && (
    <div className="max-w-5xl mx-auto p-6">

      {
        isEdit
        ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image): userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? "": assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" />

        </label>
        : <img
            className="w-28 h-28 rounded-full object-cover border"
            src={userData.image}
            alt="profile"
          />
      }

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Profile
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">

        {/* Profile Image */}
        <div className="flex items-center gap-6 mb-6">

          <img
            className="w-28 h-28 rounded-full object-cover border"
            src={userData.image}
            alt="profile"
          />

          <div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>

        </div>


        {/* User Information */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Full Name</p>

            {isEdit ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{userData.name}</p>
            )}

          </div>


          {/* Email */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-gray-800">{userData.email}</p>
          </div>


          {/* Phone */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Phone</p>

            {isEdit ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p>{userData.phone}</p>
            )}

          </div>


          {/* Gender */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Gender</p>

            {isEdit ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

          </div>


          {/* DOB */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Date of Birth</p>

            {isEdit ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <p>{userData.dob}</p>
            )}

          </div>

        </div>


        {/* Buttons */}
        <div className="mt-8">

          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50"
            >
              Edit Profile
            </button>
          )}

        </div>

      </div>

    </div>
  )
}

export default myProfile