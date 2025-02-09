import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const NavLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-xl font-semibold p-2.5 rounded-lg hover:text-gray-700 hover:bg-yellow-500 hover:scale-105 transition-transform duration-100"
    >
      {children}
    </a>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex flex-row items-center w-full h-24 px-20 py-10 bg-blue-800 text-white">
      <h1 className="text-[2rem] font-bold font-roboto">Exceptionals</h1>
      <div className="flex flex-row w-1/2 items-center ml-auto space-x-10 justify-end">
        {userLoggedIn ? (
          <p>User Logged In.</p>
        ) : (
          <>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#contacts">Contact Us</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
