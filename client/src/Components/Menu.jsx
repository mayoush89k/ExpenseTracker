import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();

  return (
    <nav className="bg-blue-500 text-black font-extrabold dark:text-dark-4 py-4 w-[90vw] m-auto">
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
      </ul>
    </nav>
  );
}
