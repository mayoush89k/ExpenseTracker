import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const useUsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();

  //   const url = "https://expense-tracker-api-vn03.onrender.com/";
  const url = "http://localhost:3434/";

  useEffect(() => {
    fetchData();
  }, [url]);

  //  get all users
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + "users/");
      setUsersList(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // signUp / register
  const createUser = async (userData) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url + "users/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
          email: userData.email,
        }),
      });
      const data = await response.json();
      setLoading(false);
      if (data.message) {
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // login user
  const loginUser = async (userData) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url + "users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const token = data.token;
      console.log("user ", data.user);

      setLoading(false);
      if (token) {
        localStorage.setItem("token", token);
      }
      if (data.message) {
        console.log("data: ", data);
        setError(data.message);
      }
      setUser(data.user)
    } catch (err) {
      console.log("err: ", err);
      setLoading(false);
      setError(err?.response.data.message);
    }
  };

  const updateUserInUsersList = async (user, newPark) => {
    const response = await axios.put(url + "users/" + user.id, {
      parksAdded: [...user.parksAdded, newPark],
    });
    console.log("Added ", newPark);
  };

  const sendEmail = async (email, text) => {
    console.log('text: ', text);
    console.log('email: ', email);
    try {
      const response = await axios.post(
        url + "emails/",
        JSON.stringify({
          text: text,
        })
      );
      console.log(response)
      return response.data
    } catch (error) {
      return error
    }
  };

  return {
    usersList,
    loading,
    error,
    sendEmail,
    updateUserInUsersList,
    createUser,
    loginUser,
  };
};

export default useUsersList;
