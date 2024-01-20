import axios from "axios";
import { createContext, useContext, useState } from "react";

export const ExpensesContext = createContext();

export const useExpense = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  //   const url = "https://expense-tracker-api-vn03.onrender.com/";
  const url = "http://localhost:3434/";

  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add expense to the list of expenses.
  const createNewExpense = (expense) => fetchPostNewExpense(expense);
  const fetchPostNewExpense = async (newExpense) => {
    try {
      setLoading(true);
      console.log("newExpense: ", newExpense);
      const expense = await axios.post(url + "expenses", {
        ...newExpense,
      });

      setExpenses([...expenses, expense.data]);
      setLoading(false);
      await fetchGetAllExpenses();
      return expense.data;
    } catch (error) {
        setLoading(false)
      setError(error);
    }
  };
  // update expense
  const updateExpense = (expense) => fetchUpdating(expense);
  const fetchUpdating = async (newExpense) => {
    try {
      setLoading(true);
      const response = await axios.put(
        url + "expenses/" + newExpense._id.toString(),
        {
          ...newExpense,
        }
      );
      await fetchGetAllExpenses();
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  // delete expense
  // get one Expense
  // get All Expenses
  const getAll = () => fetchGetAllExpenses();

  const fetchGetAllExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}expenses`);
      console.log(response.data);
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        error,
        setError,
        loading,
        getAll,
        updateExpense,
        createNewExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
