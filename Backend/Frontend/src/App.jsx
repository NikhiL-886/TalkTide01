import React from "react"
import Left from "./home/Leftpart/Left"
import Right from "./home/Rightpart/Right"
import Signup from "./components/Signup"
import Login from "./components/Login"
import { useAuth } from "./context/Authprovider"
import { Navigate, Route, Routes } from "react-router-dom"
import Loading from "./components/Loading"
import {Toaster} from "react-hot-toast"
import ProfilePage from "./components/ProfilePage"
function App(){
  const [authUser,setAuthUser]=useAuth()
  console.log(authUser);
  
  return(

   <> 
    <Routes>
      <Route path="/" element={
        authUser? (
        //    <div className="flex h-screen">
        //   <Left/>
        //   <Right/>
        // </div> 

        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex-col items-center justify-center">
    <Right/>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu w-80 min-h-full bg-black text-base-content">
      
      <Left/>
    </ul>
  </div>
</div>
        ):(
          <Navigate to={"/login"}/>
        )
      }/>
      <Route path="/signup" element={
        authUser?(
          <Navigate to={"/"}/>
        ):(
        <Signup/>
        )
      }/>
      <Route path="/login" element={
        authUser?(
          <Navigate to={"/"}/>
        ):(
        <Login/>
        )
      }/>
      <Route path="/profile" element={
        <ProfilePage/>
      }/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App