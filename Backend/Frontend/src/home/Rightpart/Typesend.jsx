import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { TfiClip } from "react-icons/tfi";
import { FcRemoveImage } from "react-icons/fc";
import useSendMessage from "../../context/useSendMessage.js";
import handleUpload from "../../utils/ImageUpload.js";
function Typesend(){
    const [message,setMessage]=useState("")
    const [imgMsg,setImgMsg]=useState("");
    const [width,setwidth]=useState("full");
    const {loading,sendMessages}=useSendMessage();
    useEffect(()=>{
        if(imgMsg===""){
            setwidth("full");
        }else{
        setwidth("[95%]");
        }
    },[imgMsg]);
    const handleSubmit=async (e)=>{
        e.preventDefault()
        var url="";
        
        if(imgMsg!==""){
            url=await handleUpload(imgMsg);
        }
        await sendMessages({message,url});
        setMessage("")
        setImgMsg("")
    }
    return(
        <form onSubmit={handleSubmit}>
        <div className="flex space-x-1 items-center h-[8vh] bg-gray-800">
            <div className="flex space-x-1 items-center w-[70%] mx-4">
                {imgMsg !== "" && (
                    <span onClick={()=>{
                        setImgMsg("");
                    }} className="text-3xl hover:cursor-pointer">
                    <FcRemoveImage />
                    </span>
                )}

            <input type="text" placeholder="Type here" value={message}
            onChange={(e)=>setMessage(e.target.value)} className={`border border-gray-700 rounded-xl outline-none w-${width} px-6 py-2  bg-black`} />
        </div>
        <div className="">
        <label className="text-3xl hover:cursor-pointer" >
            <TfiClip/>
            <input type="file" onChange={(e)=>{
                setImgMsg(e.target.files[0]);
            }} className="hidden"/>
        </label>
        </div>
        <button className="text-3xl">
            <IoSend/>
        </button>
        </div>
        </form>
    )
}

export default Typesend