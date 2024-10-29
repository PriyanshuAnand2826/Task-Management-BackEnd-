const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register api
router.post("/register", async (req, resp) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return resp.status(201).json({ message: "Email already exists" });
    } else {

      if (password !== confirmpassword) {
        return resp
          .status(202)
          .json({ success: false, message: "password not match" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
       user= await new User({name,email,password:hashedPassword})

      user.save();
      return resp
        .status(200)
        .json({ success: true, message: "User Registered Sucessfully" });
    }
  } catch (error) {
    return resp.status(400).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const {name}=user
        return resp
          .status(200)
          .json({
            success: true,
            message: "User Login Sucessfully",
            token: token,
            name:name
          });
        //token will be store in localstorage from frontend
      } else {
        return resp
          .status(201)
          .json({ success: false, message: "Invalid Password" });
      }
    }

    return resp
      .status(201)
      .json({ success: false, message: "User Not Registered" });
  } catch (error) {
    return resp.status(400).json({ success: false, message: error.message });
  }
});



router.get('/alluser',async(req,resp)=>{
  try {
    const users = await User.find()
    return resp.status(200).json({ success: true, message:"Listed Users",data: users })
  } catch (error) {
    return resp.status(400).json({ success: false, message: error.message });
  }
})

router.get("/search/:char",async(req,resp)=>{
  try {
    const {char} =req.params;
    const users = await User.find({email:new RegExp(char,"i")}).select("-_id -password")
    return resp.status(200).json({success:true,message:"User filtered on the basis of search",user:users})
  } catch (error) {
    return resp.status(400).json({success:false,message:error.message})
  }
})



module.exports = router;
