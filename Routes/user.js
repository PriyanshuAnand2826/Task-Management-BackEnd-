const express = require('express') 
const router = express.Router()
const {User} = require('../schemas/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//register api 
router.post('/register',async(req,resp)=>{
  try {
    const {name,email,password,confirmpassword} = req.body
  if(password !==confirmpassword){
    return resp.status(400).json({success:false,message:'password not match'})
  } 
     const hashedPassword = await bcrypt.hash(password,10)
    const user= await new User({name,email,password:hashedPassword})
    user.save()
  return  resp.status(201).json({success:true,message:'User Registered Sucessfully'})
  } catch (error) {
    return  resp.status(400).json({success:false,message:error.message})
  }
  
})



router.post('/login',async (req,resp)=>{
  try {
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(user){
      const isMatch = await bcrypt.compare(password,user.password)
      if(isMatch){
        return resp.status(200).json({success:true,message:'User Login Sucessfully'})
      }
      else{
        return resp.status(200).json({success:false,message:'Invalid Password'})
      }
    }

    return resp.status(400).json({success:false,message:'User Not Registered'})
    
  } catch (error) {
    return  resp.status(400).json({success:false,message:error.message})
  }
 


})












module.exports=router