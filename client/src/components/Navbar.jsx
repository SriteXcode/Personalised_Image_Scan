import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
//   const navigate = useNavigate();
  const role = localStorage.getItem("role");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        {role === "admin" ? "Admin Panel" : "User Dashboard"}
      </h1>
      {/* <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
      >
        Logout
      </button> */}
        <LogoutButton />
    </nav>
  );
};

export default Navbar;