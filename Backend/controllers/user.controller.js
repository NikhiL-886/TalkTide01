import createTokenAndSaveCookie from "../jwt/generateToken.js";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup= async (req,res)=>{
    try {
        console.log(req.body);
        const {fullname,email,password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({error:"Password and confirm password doesn't match"});
    }
    const user=await User.findOne({email})
    if(user){
        return res.status(400).json({error:"User already exists"});
    }
    const hashPassword= await bcryptjs.hash(password,10);

    const newUser= await new User({
        fullname,
        email,
        "password":hashPassword
    });
    await newUser.save();
    if(newUser){
        createTokenAndSaveCookie(newUser._id,res);
        res.status(201).json({message:"User created Successfully",user:{
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            profileURL:newUser.profileURL
        }})
    }
    } catch (error) {
        console.log("Error:"+error)
        res.status(500).json({error:"Internal Server Error"})
    }

}

export const login=async(req,res)=>{
try {
    const {email,password}=req.body;
    const user= await User.findOne({email});
    const isMatched= await bcryptjs.compare(password,user.password);
    if(!user||!isMatched){
        return res.status(400).json({error:"Login credentials Invalid"});
    }
    createTokenAndSaveCookie(user._id,res);
    res.status(200).json({message:"User logged in successfully",user:{
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        profileURL:user.profileURL
    }});
    
} catch (error) {
    console.log("Error:"+error)
    res.status(500).json({error:"Internal Server Error"})
}
}

export const logout= async(req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(200).json({message:"User logged out successfully"})
        
    } catch (error) {
        console.log("Error:"+error)
    res.status(500).json({error:"Internal Server Error"})
    }
}

export const allUsers=async(req,res)=>{
    try {
        const loggedinUser=req.user._id;
        const filteredUsers=await User.find({_id:{$ne :loggedinUser}}).select("-password");
        res.status(200).json(
            filteredUsers
        );
    } catch (error) {
        console.log("Error in allUsers Controller: "+error);
    }
}

export const updateProfile=async(req,res)=>{
    try {
    req.user.profileURL=req.body.profileUrl;
    await req.user.save();
    console.log(req.user);
    res.status(200).json({"message":"user updated successfully","user":req.user});
    } catch (error) {
        console.log(error);

        res.status(500).json({"Error":"Interval Server Error"});
    }
    

}