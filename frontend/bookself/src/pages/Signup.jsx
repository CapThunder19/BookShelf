import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/Authservices';

const Signup = () => {
  const [form, setform] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const Handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else {
      alert("Signup failed");
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
          Signup
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={Handlechange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[oklch(0.283_0.141_291.089)]"
        />

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
          style={{ backgroundColor: "oklch(0.283 0.141 291.089)" }}
          className="w-full text-white font-semibold py-3 rounded transition hover:brightness-110"
        >
          SignUp
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "oklch(0.283 0.141 291.089)" }}
            className="hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
