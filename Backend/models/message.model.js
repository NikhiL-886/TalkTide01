import mongoose from "mongoose"
import User from "../models/user.model.js"

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    message:{
        type:String,
    },
    image:{
        type:String,
        default:""
    }
},{timestamps:true});

messageSchema.pre("validate", function (next) {
    if (!this.message && !this.image) {
      next(new Error("Either text or image must be provided"));
    } else {
      next();
    }
  });

const Message=mongoose.model("Message",messageSchema);
export default Message;