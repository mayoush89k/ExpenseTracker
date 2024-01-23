import axios from "axios";
import React, { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { AiFillPlusCircle } from "react-icons/ai";
import "./style.css";
import Card from "./Card";
import { useExpense } from "../context/ExpenseContext";
import AddCard from "./AddCard";

export default function History() {
  const { expenses, getAll } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getAll();
  }, []);
  return (
    <main className="px-24 py-8 md:m-1/2 lg:m-1/3 xl:m-1/4 min-h-[90vh]">
      {expenses.length == 0 && (
        <SpinnerDotted
          className="m-auto"
          size={50}
          thickness={100}
          speed={100}
          color="rgba(131, 162, 255, 1)"
        />
      )}
      <div className="flex flex-wrap">
        {expenses.map((expense) => (
          <Card key={expense._id.toString()} expense={expense} />
        ))}
      </div>
      <button
        className="fixed bottom-6 right-5 bg-blue-500 px-4 py-2 rounded-full shadow-md
      text-light-4 hover:bg-light-4 hover:text-light-1 shadow-light-4
      dark:text-dark-1 dark:hover:bg-dark-1 dark:hover:text-dark-4 dark:shadow-dark-1"
        onClick={() => openModal()}
      >
        <AiFillPlusCircle size={60} />
      </button>
      {/* <EditCard isOpen={isModalOpen} onClose={closeModal} expense={''} /> */}
      <AddCard isOpen={isModalOpen} onClose={closeModal} expense={''} />
    </main>
  );
}
