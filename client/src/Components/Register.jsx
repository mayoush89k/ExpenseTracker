import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import useUsersList from "../hooks/useUsersList";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const [formList, setFormList] = useState([
    {
      name: "username",
      value: "",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "email",
      value: "",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      value: "",
      type: "password",
      placeholder: "Password",
    },
    {
      name: "confirmed",
      value: "",
      type: "password",
      placeholder: "Confirm Password",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [passwordConfirmedError, setPasswordConfirmedError] = useState("");
  const { createUser, error } = useUsersList();
  let navigate = useNavigate();
  const notify = (text) => toast(text);

  const handleChange = (e) => {
    setPasswordConfirmedError("");
    if (e.target.name != "confirmed") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setFormList(
      formList.map((input) =>
        input.name == e.target.name
          ? {
              ...input,
              value: e.target.value,
            }
          : input
      )
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // check passwords
    formList[3].value == formList[2].value
      ? setPasswordConfirmedError("")
      : setPasswordConfirmedError("Passwords are not matched");
    // no error => passwords are matched
    if (passwordConfirmedError == "") {
      createUser(formData);
      // no error // success creating user
      if (error == "") {
        notify("Your registration was successful. Welcome!!!");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    }
  };
  return (
    <main className="w-full h-[77vh] flex flex-col justify-center items-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4 p-4 rounded-md  bg-light-4 shadow-light-3 shadow-md dark:bg-dark-3 dark:shadow-dark-1"
      >
        <span className="text-dark-4 dark:text-light-1">{error}</span>
        {/* create the inputs as useState list of objects, so we can re-render on page by each value of input  */}
        {formList.map((input, index) => (
          <div key={index}>
            <input
              className="p-2 text-lg rounded-md border-2 border-light-2 bg-transparent placeholder:text-light-2 focus:bg-light-1 focus:text-black placeholder:focus:text-black
             dark:focus:bg-dark-4 dark:focus:text-white dark:placeholder:focus:text-white"
              key={input.name}
              type={input.type}
              name={input.name}
              value={input.value}
              placeholder={input.placeholder}
              onChange={handleChange}
            />{" "}
            <br />
          </div>
        ))}
        <span>{passwordConfirmedError}</span>
        <button
          type="submit"
          className="rounded-md py-2 px-4 border-2 hover:duration-700 border-black bg-light-1 text-black dark:bg-dark-4 dark:text-white dark:border-white hover:bg-light-4 hover:text-light-1 dark:hover:bg-dark-3 dark:hover-text-dark-1  "
        >
          Register
        </button>
      </form>
    </main>
  );
}
