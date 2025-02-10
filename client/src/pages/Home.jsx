import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import FileUpload from "../components/FileUpload";

//TO DO: Turn into /dashboard. See Frontend Specifications
const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  //Function to handle logout
  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Home</h1>
      {/*If user is logged in, display the Logout button. Otherwise, display "You are not logged in."*/}
      {currentUser ? (
        <>
          <button
            onClick={handleLogout}
            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <FileUpload />
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Home;
