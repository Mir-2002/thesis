import React from "react";
import PythonSVG from "../assets/python_logo.svg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col w-full h-screen">
      <section className="flex flex-row place-content-center w-full h-screen border-b border-gray-200">
        <div className="flex place-content-center w-1/2">
          <img src={PythonSVG} alt="Python Logo" />
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 space-y-10 font-roboto">
          <h1 className="text-[6rem] text-center text-blue-900 font-bold leading-24">
            Documentation, <br /> Made Easier.
          </h1>
          <p className="text-2xl text-center w-1/2 font-medium text-gray-600">
            Seamlessly create documentation for your Python code using our
            AI-driven tool.
          </p>
          <button
            className="p-5 bg-yellow-500 rounded-lg text-3xl text-white font-medium hover:scale-105 transition-transform duration-100"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
};

export default Landing;
