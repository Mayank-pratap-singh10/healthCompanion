import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/adminContext";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const { atoken,setAToken } = useContext(AdminContext);
  const navigate =useNavigate()
  const logout =()=>{
    navigate("/")
    atoken && setAToken("")
    atoken && localStorage.removeItem(atoken)

  }
  

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2  ">
        <img
          className="h-10 w-10  cursor-pointer"
          src={assets.Main_Logo}
          alt=""
        />
        <div className="flex flex-col justify-between ">
          <p className="text-lg">Health Companion</p>

          <span className="text-xs">Admin Panel</span>
        </div>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 ">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button onClick={logout} className="bg-sky-100 text-sky-700 text-sm px-10 py-2 rounded-full ">Logout</button>
    </div>
  );
};

export default Navbar;
