import { Router } from "express";
import {
  addNewExpense,
  deleteAnExpense,
  getAllExpenses,
  getExpenseById,
  updateAnExistingExpense,
} from "../controller/expense.controller.js";

const router = Router();

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.post("/", addNewExpense);
router.put("/:id", updateAnExistingExpense);
router.delete("/:id", deleteAnExpense);

export default router;
