import validator from "validator"
import bcrypt from "bcrypt"
import User from "../models/userModels.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import Doctor from "../models/doctorModels.js"
import Appointment from "../models/appointmentModels.js"


const registerUser =async(req,res)=>{
    try {
       const {name,email,password}=req.body
       if(!name || !password || !email){
         return res.json({success:false, message :"Missing Details"})

       } 
       if(!validator.isEmail(email)){
        return res.json({success:false, message :"Enter a valid Email"})

       }
       if(password.length <8){
        return res.json({success:false, message :"Enter a Strong Password"})


       }
       const salt = await bcrypt.genSalt(10)
       const hashedPassword =await bcrypt.hash(password,salt)
       const userData={
        name,
        email,
        password:hashedPassword
       }
       const newUser = new User(userData)
       const user =await newUser.save()

       const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
       res.json({
        success:true,
        token
       })




    } catch (error) {
        console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

        
    }

}

  const loginUser=async(req,res)=>{
    try {

        const {email,password}=req.body
        const user =await User.findOne({email})
        if(!user){
            res.json({success:false,message:"User Does not Exist"});

        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(isMatch){
            const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
             return res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})

        }
        
    } catch (error) {
        console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

        
    }
  }

  // API FOR USER PROFILE
  const getProfile=async(req , res)=>{
    try {
        const {userId}=req.body
        const userData =await User.findById(userId).select("-password")
        res.json({success:true,userData})
    } catch (error) {
        console.log(error);

    res.json({
      success: false,
      message: error.message,
    });



        
    }
  }

  // API TO UPDATE USER PROFILE
  const updateProfile =async (req,res)=>{
    try {
        const{userId,name,address,phone,dob,gender}=req.body
        const imageFile =req.file

        if(!name || !address || !phone || !dob || !gender){
            return res.json({success:false,message:"Data is Missing"})
        }
        await User.findByIdAndUpdate(userId,{name,phone,gender,dob,address:JSON.parse(address)})

        if(imageFile){
            const imageUpload =await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url

            await User.findByIdAndUpdate(userId,{image:imageUrl})

            res.json({
                success:true,
                message:"Profile Updated"
            })

        }
        
    } catch (error) {
         console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
        
    }

  }


  // API TO BOOK APPOINTMENT
  
    const bookAppointment= async (req,res)=>{
      try {
        const {userId,docId,slotTime,slotDate,} =req.body
        const docData =await Doctor.findById(docId).select("-password").lean()
        if(!docData.available){
          return res.json({success:false,message:"Doctor not Available"})


        }
        let slotsBooked=docData.slotsBooked || {}
        // checkig for slots
        if(slotsBooked[slotDate]){
          if(slotsBooked[slotDate].includes(slotTime)){
            return res.json({success:false,message:"Slot not Available"})


          }else{
            slotsBooked[slotDate].push(slotTime)

          }


        }else{
          slotsBooked[slotDate]=[]
          slotsBooked[slotDate].push(slotTime)


        }
        const userData =await User.findById(userId).select("-password")
        delete docData.slotsBooked
        const appointmentData ={
          userId,
          docId,
          userData,
          docData,
          amount:docData.fees,
          slotTime,
          slotDate,
          Date: Date.now()
        }

        const newAppointment = new Appointment(appointmentData)
        await newAppointment.save()

        //saving  slot doctor data
        await Doctor.findByIdAndUpdate(docId,{slotsBooked})
        res.json({success:true,message:"Appointment Booked"})


        
      } catch (error) {
        console.log(error);
        

    res.json({
      success: false,
      message: error.message,
    });
        
      }

    }


    // api for my-appointment page

    const listAppointment =async (req,res)=>{
      try {
        const {userId}=req.body
        const appointments=await Appointment.find({userId})
        res.json({success:true,appointments})
        
      } catch (error) {
        console.log(error);
        

    res.json({
      success: false,
      message: error.message,
    });
        
      }

    }

export {registerUser,loginUser,getProfile, updateProfile,bookAppointment,listAppointment}