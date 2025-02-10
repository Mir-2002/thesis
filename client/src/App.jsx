import { useState } from "react";
import Home from "./pages/Home";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const routes = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];
  const routesElement = useRoutes(routes);
  return (
    <>
      <AuthProvider>
        <Header />
        {routesElement}
      </AuthProvider>
    </>
  );
}

export default App;
