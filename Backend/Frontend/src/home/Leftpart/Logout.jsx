import React, { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import Cookies from"js-cookie"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authprovider";
function Logout(){
    const [loading,setLoading]=useState(false)
    const [authUser]=useAuth();
    const handleLogout= async ()=>{
        setLoading(true)
        try {
            const res=await axios.post("api/user/logout");
            localStorage.removeItem("ChatApp");
            Cookies.remove("jwt")
            setLoading(false)
            toast.success("Logged out successfullly")
            window.location.reload();
        } catch (error) {
            console.log("Error in logout: "+ error)
            toast.error("Error in logging out");
        }
    }
    return(

<div className="h-[9vh] flex items-center justify-between px-4">
  <div className="w-12 h-12 rounded-full overflow-hidden">
    <Link to="/profile">
      <img
        src={authUser.user.profileURL}
        alt="Profile"
        className="w-full h-full object-cover rounded-full cursor-pointer"
      />
    </Link>
  </div>

  <RiLogoutCircleLine
    className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full px-2 py-2"
    onClick={handleLogout}
  />
</div>

    )
}

export default Logout