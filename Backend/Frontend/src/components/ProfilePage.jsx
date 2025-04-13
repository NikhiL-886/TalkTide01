import React from "react"
import { useAuth } from "../context/Authprovider";
import ProfileImageUpload from "./ProfileImageUpload";

const ProfilePage = () => {
    const [user] = useAuth();
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-96 border border-white rounded-lg p-6 shadow-lg bg-gray-800">
                <h1 className="text-2xl text-center text-green-600 font-bold mb-6">Profile</h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32 mb-4">
                        <img 
                            src={user.user.profileURL} 
                            className="w-full h-full rounded-full object-cover border-4 border-white" 
                            alt="Profile"
                        />
                        <ProfileImageUpload />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">{user.user.fullname}</h2>
                        <p className="text-gray-400">{user.user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;