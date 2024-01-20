import React, { useEffect, useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import {
  FaCheckCircle,
  FaPlaneArrival,
  FaRegTimesCircle,
} from "react-icons/fa";
import { HashLoader } from "react-spinners";

export default function AddCard({ isOpen, onClose, expense }) {
  const [newExpense, setNewExpense] = useState({});
  const [isEdit, setIsEdit] = useState(true);
  // styling of Modal
  const overlayStyles = isOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";
  const modalStyles = isOpen
    ? "translate-y-0 opacity-100"
    : "translate-y-10 opacity-0";

  const { expenses, error, setError, loading, createNewExpense } = useExpense();

  const saveHandle = () => {
    setIsEdit(false);
    createNewExpense(newExpense);
    if (error && loading) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayStyles} bg-light-3 bg-opacity-75 dark:bg-dark-3 dark:bg-opacity-75 transition-opacity duration-300 font-bold`}
    >
      <div className="fixed inset-0 opacity-50"></div>
      <div
        className={`bg-white dark:bg-dark-4 w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 ${modalStyles}`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={() => {
            if (isOpen) {
              onClose();
              setNewExpense({});
              setError(null);
              setIsEdit(true);
            }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        {/* Modal content */}
        {loading ? (
          //  loading
          <HashLoader />
        ) : (
          <div>
            {/* error */}
            {error ? (
              <p>{error?.response?.data?.message}</p>
            ) : (
              <form>
                {/* new Expense */}
                {/* // Online Store details */}
                <input
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      onlineStore: e.target.value,
                    })
                  }
                  placeholder="Name of Store"
                  value={newExpense.onlineStore}
                  className="w-72 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black placeholder-black dark:placeholder-dark-3 dark:focus:bg-dark-1 dark:focus:text-dark-3 dark:text-dark-3"
                />
                {/* // orderID details */}
                <input
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      orderID: e.target.value,
                    })
                  }
                  placeholder="Order ID"
                  value={newExpense.orderID}
                  className="w-72 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black placeholder-black dark:placeholder-dark-3 dark:focus:bg-dark-1 dark:focus:text-dark-3 dark:text-dark-3"
                />
                {/* // productName details */}
                <input
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      productName: e.target.value,
                    })
                  }
                  placeholder="Product Name"
                  value={newExpense.productName}
                  className="w-72 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black placeholder-black dark:placeholder-dark-3 dark:focus:bg-dark-1 dark:focus:text-dark-3 dark:text-dark-3"
                />
                {/* // priceNIS and price USD details */}
                <input
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      priceNIS: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="Price NIS"
                  value={newExpense.priceNIS}
                  className="w-72 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black placeholder-black dark:placeholder-dark-3 dark:focus:bg-dark-1 dark:focus:text-dark-3 dark:text-dark-3"
                />
                <input
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      priceUSD: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="Price USD"
                  value={newExpense.priceUSD}
                  className="w-72 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black placeholder-black dark:placeholder-dark-3 dark:focus:bg-dark-1 dark:focus:text-dark-3 dark:text-dark-3"
                />
                {/* // transactionDate details */}
                <input
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      transactionDate: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="Transaction Date"
                  value={newExpense.transactionDate}
                  className="w-72 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black placeholder-black dark:placeholder-dark-3 dark:focus:bg-dark-1 dark:focus:text-dark-3 dark:text-dark-3"
                />
                {/* check status of delivery */}

                <FaPlaneArrival size={"40px"} />

                {/* Save or Edit Button */}
                <button
                  className="w-72 py-4 px-6 my-4 border rounded-md text-light-1 bg-light-4 hover:bg-opacity-20 hover:text-light-4 focus:ring ring-indigo-300 focus:outline-none dark:text dark:hover:bg-opacity-20 dark:hover:text-dark-3"
                  onClick={saveHandle}
                >
                  Save
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
