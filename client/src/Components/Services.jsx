import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useUsersList from "../hooks/useUsersList";
import { useUser } from "../context/UserContext";

export default function Services() {
  const [result, setResult] = useState("");
  const notify = (text) => toast(text);
  const { sendEmail } = useUsersList();
  const { user } = useUser();

  return (
    <div className={`pt-20 w-full h-[665px] flex flex-col justify-start items-center`}>
      <ToastContainer  />
{console.log(`h-${window.innerHeight}px`)}
      <button
        onClick={async () => {
          console.log(user);
          setResult(await sendEmail(user.email, "Weekly record: ", user.username));
          notify(result);
          console.log('result: ', result);
        }}
      >
        Send Email
      </button>
    </div>
  );
}
