import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OtpVerify() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const otpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      const token = data.accessToken || data.token;
      if (token) login(token);
      navigate("/");
    },
    onError: (error) => {
      const msg = error?.response?.data?.error || error?.response?.data?.message || "Invalid or expired OTP.";
      alert(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    otpMutation.mutate({ email: state?.email, otp });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-1 text-center">Verify Email</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter the OTP sent to <span className="font-medium text-indigo-600">{state?.email || "your email"}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">OTP Code</label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-center text-lg tracking-widest"
              required
            />
          </div>

          <button
            type="submit"
            disabled={otpMutation.isPending}
            className="mt-2 bg-indigo-700 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {otpMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerify;
