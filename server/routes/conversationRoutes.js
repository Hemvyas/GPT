import {Router} from "express";
import Conversation from "../models/Conversation.js"
const router = Router();
router.post('/',async(req,res)=>{
    const newconversation=new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const savedConversation=await newconversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/:id", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;