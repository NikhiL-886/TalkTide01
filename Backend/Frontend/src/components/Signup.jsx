import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";
import{toast} from "react-hot-toast"

function Signup(){
  const [authUser,setAuthUser]=useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password=watch("password","");
  const confirmPassword=watch("confirmPassword","");

  const validatePasswordMatch=(value)=>{
    return value==password || "Password do not match"
  }

  const onSubmit = async (data) =>{
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword
    }
    await axios.post("/api/user/signup",userInfo)
    .then((response)=>{
      console.log(response.data);
      if(response.data){
        toast.success("Login successful")

      }
      localStorage.setItem("ChatApp",JSON.stringify(response.data));
      setAuthUser(response.data);
    })
    .catch((error)=>{
      if(error.response){
        toast.error("Error:"+error.response.data.error)
      }

    });
  }
  return(
    <>
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="border border-white px-6 py-2 rounded-md w-96 space-y-3">
        <h1 className="text-xl text-center">Chat <span className="text-green-500 font-semibold">App</span></h1>
        <h2 className="text-2xl text-white font-bold">Signup</h2>
        <br />
        <label className="input input-bordered flex items-center gap-2">
  <input type="text" className="grow" placeholder="fullname"  {...register("fullname", { required: true })}  />
</label>
{errors.fullname && <span className="text-red-500 text-sm">This field is required</span>}

<label className="input input-bordered flex items-center gap-2">
  <input type="email" className="grow" placeholder="Email" 
  {...register("email", { required: true })}/>
</label>
{errors.email && <span className="text-red-500 text-sm">This field is required</span>}

<label className="input input-bordered flex items-center gap-2">
  <input type="password" className="grow" placeholder="password" 
  {...register("password", { required: true })}/>
</label>
{errors.password && <span className="text-red-500 text-sm">This field is required</span>}
<label className="input input-bordered flex items-center gap-2">
  <input type="password" className="grow" placeholder="confirm password" 
  {...register("confirmPassword", { required: true,validate:validatePasswordMatch })}/>
</label>
{errors.confirmPassword && <span className="text-red-500 text-sm">
  {errors.confirmPassword.message}</span>}

<div className="flex justify-between">
  <p>Have an account? <Link to="/login" className="text-blue-500 underline cursor-pointer ml-1">Login</Link></p>
  <input type="submit" value="Signup" className=" text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer"/>
</div>


      </form>
      </div>
      </>
  )
}

export default Signup