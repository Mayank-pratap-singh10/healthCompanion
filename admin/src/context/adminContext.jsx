import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props)=>{
    const [doctors,setDoctors] =useState([])

    const [atoken,setAToken]=useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):"")

    const backendUrl =import.meta.env.VITE_BACKEND_URL
    const allDoctors =async ()=>{
        try {
            
            const {data}= await axios.post(backendUrl +"/api/admin/all-doctors",{},{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)

            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)

            
        }
    }

    const changeAvailability=async (docId)=>{
        try {
            const {data}= await axios.post(backendUrl + "/api/admin/change-availability",{docId},{headers:{atoken}})

        if(data.success){
                toast.success(data.message)
                allDoctors()

            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const value ={
        atoken,setAToken,
        backendUrl,doctors,
        allDoctors,changeAvailability
        


    }
    return (
        <AdminContext.Provider  value={value}>
            {props.children}

        </AdminContext.Provider>
    )

}

export default AdminContextProvider