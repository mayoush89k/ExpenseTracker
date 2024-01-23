import { isValidObjectId } from "mongoose";
import STATUS_CODES from "../constants/statusCodes.js";
import Expense from "../models/expense.model.js";

const sendError = (res, statusCode, errorMsg) => {
  console.log("statusCode: ", statusCode);
  res.status(statusCode);
  throw new Error(errorMsg);
};

export const getAllExpenses = async (req, res, next) => {
  try {
    const {user} = req
    const expenses = await Expense.find({user: user._id})
      .sort({ transactionDate: -1 })
      .populate("user");
    res.send(expenses);
  } catch (error) {
    next(error);
  }
};
export const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid Id");
    }
    const expense = await Expense.findById(id).populate("user");
    if (!expense) {
      sendError(res, STATUS_CODES.NOT_FOUND, "Expense is not found");
    }
    res.send(expense);
  } catch (error) {
    next(error);
  }
};
export const addNewExpense = async (req, res, next) => {
  try {
    const {
      onlineStore,
      productName,
      transactionDate,
      priceUSD,
      priceNIS,
      isArrived,
      orderID,
    } = req.body;

    const existingExpense = await Expense.findOne({ orderID });

    if (existingExpense) {
      sendError(res, STATUS_CODES.CONFLICT, "Expense is already exist");
    }
    const newExpense = await Expense.create({
      onlineStore,
      productName,
      transactionDate,
      priceUSD,
      priceNIS,
      orderID,
      isArrived,
      user: req.user._id,
    });
    
    res.status(STATUS_CODES.CREATED).send(newExpense);
  } catch (error) {
    next(error);
  }
};
export const updateAnExistingExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid Id");
    }
    await Expense.findByIdAndUpdate(id, {
      ...req.body,
    });
    const updatedExpense = await Expense.findById(id);
    res.send(updatedExpense);
  } catch (error) {
    next(error);
  }
};
export const deleteAnExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      sendError(res.STATUS_CODES.BAD_REQUEST, "Invalid Id");
    }
    const deletedExpense = await Expense.findById(id);
    if (!deletedExpense) {
      return sendError(res, STATUS_CODES.NOT_FOUND, "Expense is not found");
    }
    await Expense.deleteOne({ orderID: deletedExpense.orderID });
    res.send(`${deletedExpense.productName} has been deleted`);
  } catch (error) {
    next(error);
  }
};
