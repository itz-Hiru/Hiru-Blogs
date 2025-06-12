import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.component";
import { UserContext } from "../../context/userContext.context";
import { API_PATHS } from "../../utils/apiPaths.util";
import axiosInstance from "../../utils/axiosInstance.util";
import { validateEmail } from "../../utils/helper.util";

const Login = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!validateEmail(trimmedEmail)) {
      toast.error("Invalid Email Address");
      return;
    }

    if (!trimmedPassword) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        toast.success("Logged in successfully");

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
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
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-black/70 mt-[5px] mb-6">
        Please enter your credentials to access your account.
      </p>
      <form onSubmit={handleLogin}>
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
        <button
          type="submit"
          disabled={isLoading}
          aria-label="Login"
          className="btn-primary mt-4 w-full"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-[13px] text-black/80 mt-5">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
