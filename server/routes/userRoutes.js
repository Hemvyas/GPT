import {Router} from "express"
import User from "../models/User.js";
const router = Router();

router.get("/",async(req,res)=>{
    try {
        const users=await User.find();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error});
        console.log(error);
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const user= await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"No se encontro elusuario con ese ID."})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
})

export default router;
