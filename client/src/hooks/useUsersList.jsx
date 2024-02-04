import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const useUsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();

  const url = "https://expense-tracker-api-vn03.onrender.com/";
  // const url = "http://localhost:3434/";

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
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // login user
  const loginUser = async (userData) => {
    console.log("userData: ", userData);
    try {
      setError("");
      setLoading(true);
      const res = await axios.post(url + "users/login", {
        username: userData.username,
        password: userData.password,
      });
      console.log("res: ", res);
      if (res.data.message) {
        console.log("first error");
        setError(res.data.message);
      }
      const token = res.data.token;
      setLoading(false);
      if (token) {
        localStorage.setItem("token", token);
      }
      if (res.data.message) {
        setError(res.data.message);
      }
      setUser(res.data.user);
      console.log(res.data);
      setError("");
    } catch (error) {
      console.log("error: ", error);
      setError(error.response.data.message);
    }
  };

  const updateUserInUsersList = async (user, newPark) => {
    const response = await axios.put(url + "users/" + user.id, {
      parksAdded: [...user.parksAdded, newPark],
    });
    console.log("Added ", newPark);
  };

  const sendEmail = async (email, text) => {
    try {
      const response = await axios.post(url + "emails", {
        body: JSON.stringify({
          text: text,
        }),
      });
      console.log(response);
      return await response.data;
    } catch (error) {
      setError(error);
    }
  };

  const deleteUser = async (user) => {
    try {
      setLoading(true);
      setError("");
      console.log("${url}users/${user.id}: ", `${url}users/${user._id}`);
      const res = await axios.delete(`${url}users/${user._id}`);
      console.log("res: ", res);
      setLoading(false);
      if (res.message) {
        setError(res);
      }
      setError("");
    } catch (error) {
      console.log("error: ", error);
      setError(error.response.data);
      setLoading(false);
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
    deleteUser,
  };
};

export default useUsersList;
