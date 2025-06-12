import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.component";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector.component";
import { UserContext } from "../../context/userContext.context";
import { API_PATHS } from "../../utils/apiPaths.util";
import axiosInstance from "../../utils/axiosInstance.util";
import { validateEmail, validatePassword } from "../../utils/helper.util";
import uploadImage from "../../utils/uploadImage.util";

const SignUp = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!validateEmail(email.trim())) {
      toast.error("Invalid Email Address");
      return;
    }

    if (!validatePassword(password.trim())) {
      toast.error("Please enter a valid password");
      return;
    }

    try {
      setIsLoading(true);

      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes?.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        profileImageUrl,
        adminAccessToken: adminAccessToken.trim(),
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        toast.success("Signup successfully");

        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Join Hiru Blogs Now</h3>
      <p className="text-xs text-black/70 mt-[5px] mb-6">
        Create your free account to start writing, sharing your thoughts, and
        connecting with a community of passionate readers and writers.
      </p>
      <form onSubmit={handleSignup}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Enter your full name"
            placeholder="John Doe"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Enter your email"
            placeholder="john@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Enter your password"
            placeholder="********"
            type="password"
          />
          <Input
            value={adminAccessToken}
            onChange={({ target }) => setAdminAccessToken(target.value)}
            label="Enter access token"
            placeholder="Optional (For Admins)"
            type="password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          aria-label="Sign up"
          className="btn-primary mt-4 w-full"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-[13px] text-black/80 mt-5">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
