import axios from "axios";
import React, { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { AiFillPlusCircle } from "react-icons/ai";
import "./style.css";
import Card from "./Card";
import { useExpense } from "../context/ExpenseContext";
import AddCard from "./AddCard";

export default function History() {
  const { expenses, loading, getAll } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <main className="px-10 md:px-24 py-8 m-1 md:m-4 lg:m-6 xl:m-8 min-h-[90vh]">
      {loading ? (
        <SpinnerDotted
          className="m-auto"
          size={50}
          thickness={100}
          speed={100}
          color="rgba(131, 162, 255, 1)"
        />
      ) : expenses.length == 0 ? (
        <h1 className="text-center">Empty List</h1>
      ) : (
        <div className="flex flex-wrap gap-3">
          {expenses.map((expense) => (
            <Card key={expense._id.toString()} expense={expense} />
          ))}
        </div>
      )}
      <button
        className="fixed bottom-6 right-5 bg-blue-500 px-2 py-1 md:px-4 md:py-2 rounded-full shadow-md
      text-light-4 hover:bg-light-4 hover:text-light-1 shadow-light-4
      dark:text-dark-1 dark:hover:bg-dark-1 dark:hover:text-dark-4 dark:shadow-dark-1"
        onClick={() => openModal()}
      >
        <AiFillPlusCircle size={60} />
      </button>
      {/* <EditCard isOpen={isModalOpen} onClose={closeModal} expense={''} /> */}
      <AddCard isOpen={isModalOpen} onClose={closeModal} expense={""} />
    </main>
  );
}
