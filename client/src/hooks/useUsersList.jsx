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

  useEffect(() => {
    setLoading(true);
    setError(""); // Reset error state when component mounts
  }, []);

  //  get all users
  const fetchData = async () => {
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
    try {
      const res = await axios.post(url + "users/signUp", {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      })
      if (res.message) {
        setError(res.message);
      }
      setLoading(false);
      setError("Ok");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  // login user
  const loginUser = async (userData) => {
    try {
      console.log('error ', error);
      const res = await axios.post(url + "users/login", {
        username: userData.username,
        password: userData.password,
      });

      const { data } = res;

      // Check for error message in response data
      if (data.message) {
        setError(data.message);
        return; // Exit function early if there's an error
      }

      const { token, user } = data;

      if (token) {
        localStorage.setItem("token", token);
      }
      setError('Ok')
      setUser(user);
    } catch (err) {
      setError(err.response.data.message); 
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
      const res = await axios.delete(`${url}users/${user._id}`);
      if (res.message) {
        setError(res);
      }
      setLoading(false);
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
