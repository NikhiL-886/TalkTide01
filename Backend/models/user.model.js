import mongoose from "mongoose";
const userSchema= mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileURL:{
        type:String,
        default:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User;