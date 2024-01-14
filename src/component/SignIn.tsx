import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface SignInProps {
  onClose: () => void;
}

const SignIn: FC<SignInProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSignIn = () => {
    const storedData = localStorage.getItem("Data");

    if (storedData) {
      const formData = JSON.parse(storedData);

      if (email === formData.email && password === formData.password) {
        onClose();
        setIsAuthenticated(true);
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } else {
      alert("No user data found. Please sign up.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={handleOverlayClick}
      style={{ zIndex: 999 }}
    >
      <div
        className="bg-white w-96 h-[320px] p-8 rounded-md max-w-md relative"
        style={{ zIndex: 1000 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 cursor-pointer z-10"
        >
          {/* Close button (X) */}
          &#x2715;
        </button>
        <h2 className="text-2xl text-center font-semibold mb-4">Sign In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSignIn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
