import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.component";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils/helper.util";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import { UserContext } from "../../context/userContext.context";

const Login = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      toast.error("Invalid Email Address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          navigate("/admin/dashboard");
          setIsLoading(false);
          toast.success("Logging Successfully.");
        } else if (role === "member") {
          navigate("/dashboard");
          setIsLoading(false);
          toast.success("Logging Successfully");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setIsLoading(false)
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again");
        setIsLoading(false);
      }
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
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-[13px] text-black/80 mt-5">
          Don't have an account ?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
