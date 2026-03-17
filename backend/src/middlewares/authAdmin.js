import jwt from "jsonwebtoken"


const authAdmin =async (req , res, next)=>{
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.json({
                success: false,
                message:" Not Authorised Try Again"
            })
        }
        const verifyToken=jwt.verify(atoken,process.env.JWT_SECRET)
        if(verifyToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message:" Not Authorised Try Again"
            })

        }
        next()
    
        
    } catch (error) {
        
        console.log(error)
        res.json({
            success: false,
            message:error.message
        })
    }


 }
  export default authAdmin