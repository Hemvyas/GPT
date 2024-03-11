import mongoose from "mongoose";
const ChatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    chats:[ChatSchema]
},{timestamps:true});

export default mongoose.model("User",userSchema);