import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../utils/AuthUtils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const SESSION_EXPIRY_DURATION = 1000 * 60 * 60; 

  const handleLogin = ({ email, password }) => {
    const result = validateUser(email, password);
    if (result.valid) {
      const expirationTime = Date.now() + SESSION_EXPIRY_DURATION;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", result.role);
      localStorage.setItem("expiresAt", expirationTime);

      if (result.role === "developer") {
        navigate("/dashboard/developer");
      } else if (result.role === "manager") {
        navigate("/dashboard/manager");
      } else {
        setAuthError("Invalid user role");
      }
    } else {
      setAuthError(result.error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole");
    const expiresAt = localStorage.getItem("expiresAt");

    if (isLoggedIn && role && expiresAt && Date.now() < Number(expiresAt)) {
      if (role === "developer") navigate("/dashboard/developer");
      if (role === "manager") navigate("/dashboard/manager");
    } else {
      // Clear session if expired or invalid
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("expiresAt");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          FealtyX Tracker
        </h2>
        <p className="text-center text-gray-500">Login to your account</p>

        {authError && (
          <p className="text-red-500 text-center text-sm">{authError}</p>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Please enter your Email",
              })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter your Password",
              })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="space-y-1 text-sm text-gray-500">
          <p>
            <span className="font-medium">Developer:</span> dev@example.com /
            dev123
          </p>
          <p>
            <span className="font-medium">Manager:</span> manager@example.com /
            manager123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
