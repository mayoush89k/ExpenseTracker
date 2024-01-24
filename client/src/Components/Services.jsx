import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useUsersList from "../hooks/useUsersList";
import { useUser } from "../context/UserContext";
import ChartBar from "./ChartBar";

export default function Services() {
  const [result, setResult] = useState("");
  const notify = (text) => toast(text);
  const { sendEmail } = useUsersList();
  const { user } = useUser();
  const recentDates = ['2024-01-01', '2024-01-02', '2024-01-03'];
  const prices = [100, 150, 120];


  return (
    <div
      className={`pt-20 w-full h-[665px] flex flex-col justify-start items-center`}
    >
      <ToastContainer />
      <button
        className="bg-dark-3 hover:bg-dark-4 text-white font-bold py-2 px-4 rounded-full transition-transform transform motion-reduce:transition-none motion-reduce:transform-none hover:scale-105 ease-in-out duration-300"
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
      <ChartBar  recentDates={recentDates} prices={prices} />

      </div>
    </div>
  );
}
