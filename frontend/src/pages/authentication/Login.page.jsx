import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.component";

const Login = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
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
          className="btn-primary"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-[13px] text-black/80 mt-5">
          Don't have an account ? {" "}
          <button
            type="button"
            className="font-medium text-blue-600 underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup")
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
