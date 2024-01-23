import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsersList from "../hooks/useUsersList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const form = [
    {
      type: "text",
      placeholder: "Username ",
      value: "",
    },
    {
      type: "password",
      placeholder: "Password ",
      value: "",
    },
  ];
  
  const [inputValues, setInputValues] = useState(form);
  const { loginUser, error } = useUsersList();
  let navigate = useNavigate();
  const notify = (text) => toast(text);

  // const handleChange =
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = {
      username: inputValues[0].value,
      password: inputValues[1].value,
    };
    loginUser(currentUser).then(() => {
      if (error == "" || isNaN(error)) {
        notify("Login Successfully");
        setTimeout(() => navigate('/myHistory') , 5000)
      } else notify(error);
    });
  };

  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <ToastContainer />
      <form
        className="flex flex-col justify-center items-center gap-4 p-4 rounded-md  bg-light-4 shadow-light-3 shadow-md dark:bg-dark-3 dark:shadow-dark-1"
        onSubmit={handleSubmit}
      >
        {inputValues.map((value, index) => (
          <div key={index}>
            <input
              className="p-2 text-lg rounded-md border-2 border-light-2 bg-transparent placeholder:text-light-2 focus:bg-light-1 focus:text-black placeholder:focus:text-black
              dark:focus:bg-dark-4 dark:focus:text-white dark:placeholder:focus:text-white"
              type={value.type}
              placeholder={value.placeholder}
              value={value.value}
              onChange={(e) =>
                setInputValues(
                  inputValues.map((value, i) =>
                    i == index ? { ...value, value: e.target.value } : value
                  )
                )
              }
            />
            {value.error && (
              <p className="text-dark-4 dark:text-light-1">{value.error}</p>
            )}
          </div>
        ))}
        <button
          className="rounded-md py-2 px-4 border-2 hover:duration-700 border-black bg-light-1 text-black dark:bg-dark-4 dark:text-white dark:border-white hover:bg-light-4 hover:text-light-1 dark:hover:bg-dark-3 dark:hover-text-dark-1"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
