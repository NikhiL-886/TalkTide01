import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../SocketIO/server.js";
export const sendMessage=async(req,res)=>{
    try {
        const {message,url}=req.body;
        const {id:receiverId}=req.params;
        // console.log(req.user);
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({members:{$all:[senderId,receiverId]}})
        if(!conversation){
            conversation=await Conversation.create({
               members:[senderId,receiverId],

            })
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            message,
            image:url
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(),newMessage.save()]);
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json({
            message:"Message sent successfully",
            newMessage
        });

    } catch (error) {
        console.log("Error in sendMessageController :" +error)
        res.status(500).json({error:"Interval server error"})
        
    }
}

export const getMessage=async (req,res)=>{
    try {
    const {id:chatUser}=req.params;
    const senderId=req.user._id;

    let conversation=await Conversation.findOne({members:{$all: [senderId,chatUser]}}).populate("messages");
    if(!conversation){
        return res.status(201).json([]);
    }
    res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("Error in getMessage fn:"+error);
        res.status(500).json({error:"Internal server error"});
    }
}