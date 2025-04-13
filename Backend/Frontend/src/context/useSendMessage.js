import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios"

const useSendMessage=()=>{
    const [loading,setLoading]=useState(false);
    const{messages,setMessage,selectedConversation}=useConversation();

    const sendMessages=async(completeMsg)=>{
        setLoading(true)
        try {
            const{message,url}=completeMsg;
            const res=await axios.post(`/api/message/send/${selectedConversation._id}`,{message,url});
            setMessage([...messages,res.data.newMessage])
            setLoading(false);
        } catch (error) {
            console.log('Error in send messsages',error)
            setLoading(false);
        }
    
    }
    return{loading,sendMessages}
}

export default useSendMessage;