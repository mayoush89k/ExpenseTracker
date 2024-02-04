import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Menu() {
  const navigate = useNavigate()
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
    <nav className="text-black font-extrabold dark:text-dark-4 py-0 w-full md:py-4 md:w-[90vw] m-auto transition-transform duration-75 ease-in">
      {!user?.username ? (
        <ul className="flex space-x-4 justify-center items-center ">
          <Link
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-2 py-1 md:px-4 md:py-2 rounded transition duration-300 ease-in-out"
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-2 py-1 md:px-4 md:py-2 rounded transition duration-300 ease-in-out"
            to={"/register"}
          >
            Register
          </Link>
        </ul>
      ) : (
        <ul className=" p-4 flex flex-col md:flex-row space-x-4 justify-center items-start md:items-center md:justify-center bg-light-1 dark:bg-dark-4 md:bg-transparent">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4  m-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            >
              {item.name}
            </Link>
          ))}
          {user?.username ? (
          <button
            className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={() => {
              logOutUser()
              setTimeout(() => {navigate('/')}, 2000)
            }}
          >
            Logout
          </button>
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
      <p className="text-light-4 dark:text-dark-1">{user.username}</p>
        </ul>
      )}
    </nav>
  );
}
