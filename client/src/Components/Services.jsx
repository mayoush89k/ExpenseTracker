import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useUsersList from "../hooks/useUsersList";
import { useUser } from "../context/UserContext";
import ChartBar from "./ChartBar";
import { useExpense } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [result, setResult] = useState("");
  const notify = (text) => toast(text);
  const { sendEmail, deleteUser , error } = useUsersList();
  const { user, logOutUser } = useUser();
  const { prices, getAllPrices, dates, getAllDates } = useExpense();
  const recentDates = dates;
  const chartPrices = prices;
  const navigate = useNavigate();

  useEffect(() => {
    getAllDates();
    getAllPrices();
    console.log(prices);
    console.log(dates);
  }, []);
  return (
    <div className="pt-20 w-full h-[78vh] flex flex-col justify-start items-center">
      <ToastContainer />
      <button
        className="bg-light-4 dark:bg-dark-3 hover:bg-light-1 hover:text-light-4 dark:hover:text-dark-4 m-4 px-4 py-2 rounded transition duration-300 ease-in-out"
        onClick={() => {
          deleteUser(user);
          if(error){
            console.log(error)
            notify(error.message)
          }
          else{
            notify("User Deleted Successfully")
            logOutUser();
            setTimeout(() => {
              navigate("/");
            }, 2000);

          }
        }}
      >
        Delete Account
      </button>
      <button
        className="bg-light-4 hover:bg-light-1 hover:text-light-4 dark:bg-dark-3 dark:hover:bg-dark-4 text-white font-bold py-2 px-4 rounded-full transition-transform transform motion-reduce:transition-none motion-reduce:transform-none hover:scale-105 ease-in-out duration-300"
        onClick={async () => {
          setResult(
            await sendEmail(user.email, "Weekly record: ", user.username)
          );
          setTimeout(() => {
            notify(result);
          }, 2000);
        }}
      >
        Send Email
      </button>
      <div className="p-10">
        <ChartBar recentDates={recentDates} prices={chartPrices} />
      </div>
    </div>
  );
}
