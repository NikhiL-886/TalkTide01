import toast from "react-hot-toast";
import axios from "axios";

const handleUpload=async(image)=>{
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
        return cloudinaryResponse.data.secure_url;

    } catch (error) {
        return toast.error("Error:"+error.response.data.error)
    }
}

export default handleUpload;