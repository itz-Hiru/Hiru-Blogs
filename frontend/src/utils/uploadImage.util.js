import toast from "react-hot-toast";
import { API_PATHS } from "./apiPaths.util";
import axiosInstance from "./axiosInstance.util";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set header for file upload
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Error uploading image");
    console.error("Error while uploading image: ", error);
    throw error; // Rethrow error for handling
  }
};

export default uploadImage;
