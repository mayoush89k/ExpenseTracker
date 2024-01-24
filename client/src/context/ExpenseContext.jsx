import axios from "axios";
import { createContext, useContext, useState } from "react";

export const ExpensesContext = createContext();

export const useExpense = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const url = "https://expense-tracker-api-vn03.onrender.com/";
  // const url = "http://localhost:3434/";

  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add expense to the list of expenses.
  const createNewExpense = (expense) => fetchPostNewExpense(expense);
  const fetchPostNewExpense = async (newExpense) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const expense = await fetch(url + "expenses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newExpense }),
      });

      setExpenses([...expenses, expense.data]);
      setLoading(false);
      await fetchGetAllExpenses();
      return expense.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  // update expense
  const updateExpense = (expense) => fetchUpdating(expense);
  const fetchUpdating = async (newExpense) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await fetch(
        url + "expenses/" + newExpense._id.toString(),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
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
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(`${url}expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getAllDates = async () => {
    try {
      await getAll();
      const dates = expenses.map((e) => e.transactionDate);
      console.log('dates: ', dates);

      setDates(dates);
      setLoading(false);
      return dates;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getAllPrices = async () => {
    try {
      await getAll();
      console.log(expenses)
      const prices = expenses.map((e) => e.priceNIS || e.priceUSD);
      console.log('prices: ', prices);

      setPrices(prices);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        dates,
        prices,
        error,
        setError,
        loading,
        getAll,
        getAllDates,
        getAllPrices,
        updateExpense,
        createNewExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
