import React from "react";
import useConversation from "../../zustand/useConversation.js"
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({user}){
    const{selectedConversation,setSelectedConversation}=useConversation()
    const {socket,onlineUsers}=useSocketContext()
    const  isOnline=onlineUsers.includes(user._id)

    const isSelected=selectedConversation?._id===user._id;

    return (
        <div className={`hover:bg-slate-600 duration-300 ${isSelected?"bg-slate-700":""}`} onClick={()=>setSelectedConversation(user)}>
            <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
            <div className={`avatar ${isOnline?"online":""}`}>
  <div className="w-12 rounded-full">
    <img src={user.profileURL}
    alt="Profile"
    className="w-full h-full object-cover rounded-full cursor-pointer" />
  </div>
</div>
            <div>
                <h1 className="font-bold">{user.fullname}</h1>
                <span>{user.email}</span>
            </div>
            </div>
        </div>
    )
}

export default User