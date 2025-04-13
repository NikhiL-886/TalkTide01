import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useAuth } from "../context/Authprovider";
import toast from "react-hot-toast";


const ProfileImageUpload = () => {
    const [authUser, setAuthUser] = useAuth();
    const [image, setImage] = useState(null);

    useEffect(() => {
        if(image) {
            handleUpload();
        }
    }, [image]);

    const handleUpload=async()=>{
        if(!image) {
            // return alert("No image selected")
            return toast.error("No image selected");
        }
        const validTypes=['image/jpeg','image/png','image/webp'];
        const maxSizeMB=5;
        if(!validTypes.includes(image.type)) return toast.error("Only jpeg,png,webp are allowed")
        if(image.size>maxSizeMB*1024*1024){
            // return alert(`File must be <${maxSizeMB} MB`);
            return toast.error(`File must be <${maxSizeMB} MB`)
        }
        const formData=new FormData();
        formData.append('file',image);
        formData.append('upload_preset','user_profile_preset');

        try {
            const cloudinaryResponse= await axios.post(
                'https://api.cloudinary.com/v1_1/dpzn3di6l/image/upload',
                formData,
                {
                    headers:{'Content-Type':'multipart/form-data'},
                    onUploadProgress:(progress)=>{
                        console.log(`Upload:${Math.round((progress.loaded/progress.total)*100)}%`);
                    }
                }
            )

            const res=await axios.patch(
                '/api/user/update-profile',
                {profileUrl:cloudinaryResponse.data.secure_url},
            );
            
            setAuthUser(res.data);
            localStorage.setItem("ChatApp",JSON.stringify(res.data));


            toast.success("Profile Updated successfully");

        } catch (error) {
            toast.error("Error:"+error.response.data.error)
        }
    }

    return (
        <div className="absolute bottom-0 right-0">
            <label className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <span className="text-2xl text-white">+</span>
                <input 
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                    accept="image/jpeg, image/png, image/webp"
                />
            </label>
        </div>
    );
};

export default ProfileImageUpload;