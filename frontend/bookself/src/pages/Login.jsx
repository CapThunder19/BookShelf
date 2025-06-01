import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { login } from "../services/Authservices";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setform] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const Handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      alert(res.msg || "Login Failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/a.jpeg')",
        backgroundColor: "oklch(0.283 0.141 291.089)",
      }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <form
        onSubmit={Handlesubmit}
        className="max-w-md w-full p-8 bg-white/90 backdrop-blur rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[oklch(0.283_0.141_291.089)]">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={Handlechange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[oklch(0.283_0.141_291.089)]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={Handlechange}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[oklch(0.283_0.141_291.089)]"
        />

        <button
          type="submit"
          style={{
            backgroundColor: "oklch(0.283 0.141 291.089)",
          }}
          className="w-full text-white font-semibold py-3 rounded transition hover:brightness-110"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "oklch(0.283 0.141 291.089)" }}
            className="hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
