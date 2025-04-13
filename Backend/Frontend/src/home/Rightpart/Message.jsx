import React from "react";

function Message ({message}){
  const authUser=JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe=message.senderId===authUser.user._id;
  const chatName=itsMe? "chat-end":"chat-start";
  const chatColor=itsMe?"bg-blue-500":"";

  const createdAt= new Date(message.createdAt)
  const formattedTime=createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  });
    return(
        <div>
            <div className="p-4">
            <div className={`chat ${chatName}`}>
  <div className={`chat-bubble text-white ${chatColor}`}>
    {message.image!==""?
    <img src={message.image} alt="" className="w-45 h-45 rounded-lg object-cover border-4 border-white"/>:
    null  
  }
    {message.message}</div>
  <div className="chat-footer">{formattedTime}</div>
</div>
            </div>
        </div>
    )
}

export default Message