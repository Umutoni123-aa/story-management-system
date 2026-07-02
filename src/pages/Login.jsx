import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data.accessToken || data.token;
      login(token);
      navigate("/");
    },
    onError: (error) => {
      const msg = error?.response?.data?.error || error?.response?.data?.message || "Invalid email or password.";
      alert(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-1 text-center">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Log in to continue to StoryApp</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-2 bg-indigo-700 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
