import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Menu() {
  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "My History",
      link: "/myHistory",
    },
    {
      name: "About Us",
      link: "/aboutUs",
    },
    {
      name: "Contact Us",
      link: "/contactUs",
    },
  ];
  const { user , logOutUser } = useUser();

  return (
    <nav className="bg-blue-500 text-black font-extrabold dark:text-dark-4 py-4 w-[90vw] m-auto">
      {!user?.username ? (
        <ul className="flex space-x-4 justify-center items-center">
          <Link
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            to={"/register"}
          >
            Register
          </Link>
        </ul>
      ) : (
        <ul className="flex space-x-4 justify-center items-center">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            >
              {item.name}
            </Link>
          ))}
          {user?.username ? (
        <div>
          <button
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={() => {
              logOutUser()
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}
        </ul>
      )}
    </nav>
  );
}
