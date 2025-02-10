import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGithub,
} from "../firebase/auth";

//TO DO: GitHub Login. Retrieve user information from GitHub and store it in the database.
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Function to handle email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  //Function to handle password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //Function to handle form submission and sign in with email and password using Firebase Authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  //Function to handle sign in with Github using Firebase Authentication
  const handleGithubLogin = async () => {
    try {
      await doSignInWithGithub();
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <main className="flex place-content-center w-full h-screen font-roboto">
        <section className="flex flex-col space-y-10 items-center justify-center w-full h-screen">
          <h1 className="text-[3rem] font-bold">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-20 w-1/4 space-y-10 border-4 border-gray-200 rounded-xl"
          >
            <div className="flex flex-col space-y-3">
              <label htmlFor="usernameOrEmail" className="text-xl font-medium">
                Email
              </label>
              <input
                type="text"
                name="usernameOrEmail"
                id="usernameOrEmail"
                value={email}
                onChange={handleEmailChange}
                required
                className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="password" className="text-xl font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {/*TO DO: Link to Forgot Password page*/}
              <Link to="" className="hover:underline">
                Forgot Password?
              </Link>
            </div>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="flex flex-row items-center justify-between">
              <button
                type="submit"
                className="w-1/3 p-3 text-white rounded-lg bg-blue-700 hover:bg-blue-800 text-base font-medium"
              >
                Sign In
              </button>
              <p>
                Don't have an account? <br />
                <Link to="/register" className="text-blue-700 hover:underline">
                  Register
                </Link>
              </p>
            </div>

            <div className="flex flex-row items-center justify-center space-x-5">
              <hr className="w-1/3 border-2 border-gray-200" />
              <p className="text-base font-semibold">OR</p>
              <hr className="w-1/3 border-2 border-gray-200" />
            </div>
            <button
              type="button"
              onClick={handleGithubLogin}
              className="p-3 bg-black text-white text-base rounded-lg"
            >
              Login with GitHub
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
