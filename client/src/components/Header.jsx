import React from "react";
import { useAuth } from "../contexts/authContext";

//A reusable NavLink component for Navigation (About, Features, Contact Us)
const NavLink = ({ href, children }) => {
  //Takes in href and children as props. href as the link to the section, children as the text
  return (
    <a
      href={href}
      className="text-xl font-semibold p-2.5 rounded-lg hover:text-gray-700 hover:bg-yellow-500 hover:scale-105 transition-transform duration-100"
    >
      {children}
    </a>
  );
};

//TO DO: Make Exceptionals a link to the landing page
const Header = () => {
  const { currentUser, userLoggedIn } = useAuth();
  return (
    <nav className="flex flex-row items-center w-full h-24 px-20 py-10 bg-blue-800 text-white">
      <h1 className="text-[2rem] font-bold font-roboto">Exceptionals</h1>
      <div className="flex flex-row w-1/2 items-center ml-auto space-x-10 justify-end">
        {/*If user is logged in, display "User Logged In." Otherwise, display the NavLink components*/}
        {userLoggedIn ? (
          <p>Welcome, {currentUser.username}</p>
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
