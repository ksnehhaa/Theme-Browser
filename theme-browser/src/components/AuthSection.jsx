import React, { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import graphicvid from "../assets/static-images/graphicvid.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Make sure this path is correct

const AuthSection = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        identifier: loginData.identifier,
        password: loginData.password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={graphicvid}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

      <div className="relative z-20 w-full max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
        >
          {isSignup ? "Create an Account" : "Welcome Back"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white text-sm md:text-base mb-6"
        >
          <Typewriter
            options={{
              strings: [
                "Make a free account and get access to your personal helping hand.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </motion.p>

        <form
          onSubmit={isSignup ? handleSignup : handleLogin}
          className="bg-black bg-opacity-60 p-6 rounded-lg flex flex-col gap-4 text-white"
        >
          {isSignup ? (
            <>
              <input
                type="text"
                placeholder="Username"
                className="bg-gray-800 bg-opacity-70 p-3 rounded focus:outline-none"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-800 bg-opacity-70 p-3 rounded focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-800 bg-opacity-70 p-3 rounded focus:outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-gray-800 bg-opacity-70 p-3 rounded focus:outline-none"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Email or Username"
                className="bg-gray-800 bg-opacity-70 p-3 rounded focus:outline-none"
                value={loginData.identifier}
                onChange={(e) =>
                  setLoginData({ ...loginData, identifier: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-800 bg-opacity-70 p-3 rounded focus:outline-none"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />

              {/* ✅ Forgot Password Link */}
              <p
                onClick={() => setShowResetModal(true)}
                className="text-xs text-blue-400 underline cursor-pointer hover:text-blue-300"
              >
                Forgot Password?
              </p>
            </>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-white text-gray-900 font-semibold p-3 rounded hover:bg-gray-200 transition"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <p className="text-center text-xs">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsSignup(false)}
                  className="underline cursor-pointer hover:text-gray-300"
                >
                  Log In
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setIsSignup(true)}
                  className="underline cursor-pointer hover:text-gray-300"
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </form>
      </div>

      {/* ✅ Forgot Password Modal */}
      {showResetModal && (
        <ForgotPasswordModal closeModal={() => setShowResetModal(false)} />
      )}
    </section>
  );
};

export default AuthSection;