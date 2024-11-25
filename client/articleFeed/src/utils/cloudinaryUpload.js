import axios from "axios";

const CLOUDINARY_URL='https://api.cloudinary.com/v1_1/dbfpk9qoh/image/upload'
export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hy-hire');
   

    try {
        const response = await axios.post(
            CLOUDINARY_URL,
            formData
        );
        return response.data.url
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload ');
    }
};



