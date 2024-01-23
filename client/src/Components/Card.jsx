import React, { useState } from "react";
import {
  FaCheckCircle,
  FaPlaneArrival,
  FaRegTimesCircle,
} from "react-icons/fa";
import EditCard from "./EditCard";

export default function Card({ expense }) {
  const [isModalOpen, setIsModalOpen] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  let date = new Date(expense.transactionDate).toLocaleDateString("en-GB");
  return (
    <div
      className="cursor-pointer group max-w-md mx-auto my-6 rounded-md overflow-hidden text-lg md:text-2xl
       bg-white dark:bg-gray-800 text-gray-800 
       dark:text-white shadow-md dark:shadow-outer dark:bg-dark-2  dark:shadow-dark-1 "
      onClick={() => !isModalOpen && openModal()}
    >
      <EditCard isOpen={isModalOpen} onClose={closeModal} expense={expense} />
      <div className="py-4 px-6 font-bold uppercase tracking-wide text-center bg-light-4 dark:bg-dark-3 group-hover:bg-opacity-35">
        {/* //! missing icon of store */}
        {expense?.productName}
      </div>
      <div className="p-4 flex flex-row justify-center items-center">
        <div className="px-4 m-2 rounded-s-xl text-light-1 group-hover:text-dark-1 group-hover:dark:text-opacity-35">
          {expense.isArrived ? (
            <FaCheckCircle size={"40px"} />
          ) : expense.isCanceled ? (
            <FaRegTimesCircle size={"40px"} />
          ) : (
            <FaPlaneArrival size={"40px"} />
          )}
        </div>
        <div className="p-4 flex flex-col justify-center items-center">
          <p className="px-3 md:px-5 py-2 m-2 rounded-md text-base md:text-lg font-extrabold bg-dark-1 bg-opacity-55 text-dark-4 dark:bg-light-1 dark:text-dark-4 group-hover:dark:bg-opacity-35 group-hover:bg-opacity-100 ">
            {expense?.priceNIS
              ? expense?.priceNIS + "₪"
              : expense?.priceUSD + "$"}
          </p>
          <p className="px-3 md:px-5 py-2 m-2 rounded-md text-base md:text-lg font-extrabold bg-dark-1 bg-opacity-55 text-dark-4 dark:bg-light-1 dark:text-dark-4 group-hover:dark:bg-opacity-35 group-hover:bg-opacity-100">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
}
