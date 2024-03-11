import { Router } from "express";
import Message from  "../models/Message.js";
const router = Router();
router.post( "/", async ( req, res ) => {
    const message = new Message(req.body);
    try {
        const newMessage=await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
         res.status(500).json(error);
    }
})

export default router;
