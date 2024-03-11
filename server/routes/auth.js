import { Router } from "express";
import bcrypt from "bcrypt"
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import verifyToken from "../verifyToken.js"
const router=Router();

router.post("/register",async(req,res)=>{
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: 'User already Registered' });
    const hashPassword=await bcrypt.hash(req.body.password,10);
    const newUser=new User({...req.body,password:hashPassword});
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})


router.post("/login",async(req,res)=>{
    const user=await User.findOne({email: req.body.email});
      if (!user) {
        return res.status(401).json("No user found with this Email");
      }
      const validPassord = await bcrypt.compare(req.body.password
        ,user.password);
        if(!validPassord){
            return res.status(403).json("Incorrect Password");
        }

        res.clearCookie("auth_token",
        {
            httpOnly:true
        });
        const token=jwt.sign({_id:user._id},process.env.JWT,
            {expiresIn:"1d"})
        res.cookie("auth_token",token,
        {
            httpOnly:true
        })    
        const {password, ...info}=user._doc;
        return res.status(200).json({token:token,"userInfo": info});
})



router.get('/validate', verifyToken, (req, res) => {
    res.status(200).json({
        message: "User authenticated",
        userInfo: req.user
    });
});


export default router;