import React,{useState} from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

const login = () => {
  const {backendUrl,token,setToken} =useContext(AppContext)
  const [state,setState] = useState("Sign Up")
  const naviagte =useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  const [name,setName] = useState("")

  const onSubmit =async (e) => {
    e.preventDefault()
    try {
      if(state == "Sign Up"){
        const {data} = await axios.post(backendUrl + "/api/user/register",{name,password,email})
        if(data.success){
          localStorage.setItem("token",data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }



      }else{
        const {data} = await axios.post(backendUrl + "/api/user/login",{password,email})
        if(data.success){
          localStorage.setItem("token",data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }

      }
    } catch (error) {
      toast.error(error.message)
      res.json({success:false, message:"invalid credentials"})
      
    }
    
  }

  useEffect(()=>{
    if(token){
      naviagte("/")

    }

  },[token])
  return (
    <form onSubmit={onSubmit} className='min-h-[80vh] flex items-center ' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[350px] sw:min-w-96 border border-zinc-300 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "login"} to book appointments</p>
        {
          state === "Sign Up"  && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' value={name} onChange={(e) => setName(e.target.value)}  type="text" placeholder='Enter your full name' required />
        </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' value={email} onChange={(e) => setEmail(e.target.value)}  type="email" placeholder='Enter your Email' required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' value={password} onChange={(e) => setPassword(e.target.value)}  type="password" placeholder='Enter your Password' required />
        </div>
        <button type="submit" className='bg-sky-100 text-sky-700 w-full py-2 rounded-md text-base'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" ?
          <p className='text-sm'>Already have an account? <span onClick={() => setState("Login")} className='text-sky-700 underline cursor-pointer'>Login</span></p>
          :
          <p className='text-sm'>Don't have an account? <span onClick={() => setState("Sign Up")} className='text-sky-700 underline cursor-pointer'>Sign Up</span></p>
        }
      </div>

    </form>
  )
}

export default login
