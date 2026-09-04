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
      className="grid grid-cols-4  items-center justify-between max-w-[90%] cursor-pointer group max-w-md mx-auto my-2 rounded-md overflow-hidden text-lg md:text-2xl
       bg-white dark:bg-gray-800 text-gray-800 
       dark:text-white shadow-md dark:shadow-outer dark:bg-dark-2  dark:shadow-dark-1 "
      onClick={() => !isModalOpen && openModal()}
    >
      <EditCard isOpen={isModalOpen} onClose={closeModal} expense={expense} />
      <div className="py-2 px-4 rounded-md uppercase tracking-wide text-center bg-light-4 dark:bg-dark-3 group-hover:bg-opacity-35">
        {expense?.productName}
      </div>
      <div className="mx-auto">
        {expense.isArrived ? (
          <FaCheckCircle size={"40px"} />
        ) : expense.isCanceled ? (
          <FaRegTimesCircle size={"40px"} />
        ) : (
          <FaPlaneArrival size={"40px"} />
        )}
      </div>
      <p>
        {expense?.priceNIS ? expense?.priceNIS + "₪" : expense?.priceUSD + "$"}
      </p>
      <p>{date}</p>
    </div>
  );
}
