import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

//TO DO: Implement loading states
//TO DO: GitHub Registration
const Register = () => {
  //State variables for form data and error handling
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerEndpoint = import.meta.env.VITE_API_ENDPOINT + "/api/users"; //API Endpoint for user registration. See src/.env

  //Function to handle form input. Updates the form data state variable with the input values from the form fields. Spread operator is used to keep the other form data values unchanged.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Function to handle form submission and user registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      //Make a POST request to the registerEndpoint with the username and email in the request body. If the request is successful, create a new user with the email and password using the doCreateUserWithEmailAndPassword function from the firebase/auth.js file. Reset the form data state variable and set the error state variable to null. Redirect the user to the login page.
      const response = await axios.post(registerEndpoint, {
        username,
        email,
      });
      await doCreateUserWithEmailAndPassword(email, password);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      console.log(response.data);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex place-content-center w-full h-screen font-roboto">
        <section className="flex flex-col space-y-10 items-center justify-center w-full h-screen">
          <h1 className="text-[3rem] font-bold">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-20 w-1/4 space-y-10 border-4 border-gray-200 rounded-xl"
          >
            <div className="flex flex-col space-y-3">
              <label htmlFor="username" className="text-xl font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="email" className="text-xl font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="confirmPassword" className="text-xl font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="flex flex-row items-center justify-between">
              <button
                type="submit"
                className="w-1/3 p-3 text-white rounded-lg bg-blue-700 hover:bg-blue-800 text-base font-medium"
              >
                Register
              </button>
              <p className="text-base">
                Already have an account? <br />
                <Link to="/login" className="text-blue-700 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Register;
