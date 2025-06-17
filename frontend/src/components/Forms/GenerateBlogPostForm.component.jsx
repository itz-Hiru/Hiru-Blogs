import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import Input from "../Inputs/Input.component";
import { LuLoaderCircle } from "react-icons/lu";

const GenerateBlogPostForm = ({
  contentParams,
  setPostContent,
  handleCloseForm,
}) => {
  const [formData, setFormData] = useState({
    title: contentParams?.title || "",
    tone: contentParams?.tone || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleGenerateBlogPost = async (e) => {
    e.preventDefault();

    const { title, tone } = formData;

    if (!title || !tone) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Call AI API
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST,
        { title, tone }
      );

      const generatedPost = aiResponse.data;
      setPostContent(title, generatedPost || "");
      toast.success("Generated successfully.");
      handleCloseForm();
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again");
        console.error("Error while generating: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Generate a Blog Post</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Provide a title and tone to generate your blog post.
      </p>
      <form onSubmit={handleGenerateBlogPost} className="flex flex-col gap-3">
        <Input
          value={formData.title}
          onChange={({ target }) => handleChange("title", target.value)}
          label="Post Title"
          placeholder="Enter blog post title"
          type="text"
        />
        <Input
          value={formData.tone}
          onChange={({ target }) => handleChange("tone", target.value)}
          label="Post Tone"
          placeholder="Enter blog post tone"
          type="text"
        />
        <button type="submit" className="btn-primary mt-2" disabled={isLoading}>
          {isLoading && <LuLoaderCircle className="animate-spin text-[18px]" />}
          {isLoading ? "Generating..." : "Generate Post"}
        </button>
      </form>
    </div>
  );
};

export default GenerateBlogPostForm;
