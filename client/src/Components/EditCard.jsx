import React, { useState } from "react";
import {
  FaCheckCircle,
  FaPlaneArrival,
  FaRegTimesCircle,
} from "react-icons/fa";
import { HashLoader } from "react-spinners";
import { useExpense } from "../context/ExpenseContext";

export default function EditCard({ isOpen, onClose, expense }) {
  // styling of Modal
  const overlayStyles = isOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";
  const modalStyles = isOpen
    ? "translate-y-0 opacity-100"
    : "translate-y-10 opacity-0";

  const [isEdit, setIsEdit] = useState(false);
  const [editedExpense, setEditedExpense] = useState(expense);
  const { error, loading, updateExpense } = useExpense();

  const editHandler = () => {
    if (isEdit) {
      // save button handler
      console.log(editedExpense)
      updateExpense(editedExpense);
    } else {
        console.log(editedExpense)
      // edit button handler
    }
    setIsEdit(!isEdit);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayStyles} bg-light-3 bg-opacity-75 dark:bg-dark-3 dark:bg-opacity-75 transition-opacity duration-300`}
    >
      <div className="fixed inset-0 opacity-50"></div>
      <div
        className={`bg-white dark:bg-dark-4 w-72 p-8 rounded-md shadow-md transform transition-transform duration-300 ${modalStyles}`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={() => isOpen && onClose()}
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
          <HashLoader />
        ) : (
          <div>
            {error && <p>error.message</p>}
            <h3>{editedExpense.onlineStore}</h3>
            <h3>{editedExpense.orderID}</h3>
            {isEdit ? (
              <input
                onChange={(e) =>
                  setEditedExpense({
                    ...editedExpense,
                    productName: e.target.value,
                  })
                }
                value={editedExpense.productName}
                className="w-52 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black dark:focus:bg-dark-1 dark:focus:text-dark-3"
              />
            ) : (
              <h2 className="text-2xl font-bold mb-4">
                {editedExpense.productName}{" "}
              </h2>
            )}
            {isEdit ? (
              <div>
                <input
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      priceNIS: e.target.value,
                    })
                  }
                  value={editedExpense.priceNIS || 0}
                  className="w-52 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black dark:focus:bg-dark-1 dark:focus:text-dark-3"
                />
                <input
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      priceUSD: e.target.value,
                    })
                  }
                  value={editedExpense.priceUSD || 0}
                  className="w-52 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black dark:focus:bg-dark-1 dark:focus:text-dark-3"
                />
              </div>
            ) : (
              <div>
                <p>{editedExpense.priceNIS || 0}₪ </p>
                <p>{editedExpense.priceUSD || 0}$ </p>
              </div>
            )}
            {isEdit ? (
              <input
                onChange={(e) =>
                  setEditedExpense({
                    ...editedExpense,
                    transactionDate: e.target.value,
                  })
                }
                value={editedExpense.transactionDate}
                className="w-52 py-2 px-4 my-4 bg-light-1 focus:bg-light-4 hover:bg-opacity-70 focus:text-black dark:focus:bg-dark-1 dark:focus:text-dark-3"
              />
            ) : (
              <p>
                {new Date(expense.transactionDate).toLocaleDateString("en-GB")}
              </p>
            )}

            {isEdit && !editedExpense.isArrived && !editedExpense.isCanceled ? (
              <div>
                <button
                  className="w-20 text-sm py-2 px-4 my-4 mx-2 border rounded-md text-light-4 bg-light-1 hover:bg-opacity-20 hover:text-light-4 focus:ring ring-indigo-300 focus:outline-none dark:text dark:hover:bg-opacity-20 dark:hover:text-dark-3"
                  onClick={() =>
                    setEditedExpense({ ...editedExpense, isArrived: true })
                  }
                >
                  Arrived
                </button>
                <button
                  className="w-20 text-sm py-2 px-4 my-4 mx-2 border rounded-md text-light-4 bg-light-1 hover:bg-opacity-20 hover:text-light-4 focus:ring ring-indigo-300 focus:outline-none dark:text dark:hover:bg-opacity-20 dark:hover:text-dark-3"
                  onClick={() =>
                    setEditedExpense({ ...editedExpense, isCanceled: true })
                  }
                >
                  Canceled
                </button>
              </div>
            ) : editedExpense.isArrived ? (
              <FaCheckCircle size={"40px"} />
            ) : editedExpense.isCanceled ? (
              <FaRegTimesCircle size={"40px"} />
            ) : (
              <FaPlaneArrival size={"40px"} />
            )}

            <button
              className="w-52 py-4 px-6 my-4 border rounded-md text-light-1 bg-light-4 hover:bg-opacity-20 hover:text-light-4 focus:ring ring-indigo-300 focus:outline-none dark:text dark:hover:bg-opacity-20 dark:hover:text-dark-3"
              onClick={editHandler}
            >
              {isEdit ? "Save" : "Edit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
