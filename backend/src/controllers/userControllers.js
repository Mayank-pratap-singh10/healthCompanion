import validator from "validator"
import bcrypt from "bcrypt"
import User from "../models/userModels.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"


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


export {registerUser,loginUser,getProfile, updateProfile}