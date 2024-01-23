import { model, Schema } from "mongoose";


const expenseSchema = new Schema({
  onlineStore: {
    type: String,
    required: [true, "Please provide the seller platform"],
  },
  productName: {
    type: String,
    required: [true, "please provide a product name"],
  },
  transactionDate: {
    type: Date,
    required: [true, "please provide a transaction date"],
  },
  orderID: {
    type: String,
    required: [true, "please provide a order ID"],
    unique: [true, "Order id must be Unique"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  priceNIS: Number,
  priceUSD: Number,
  isArrived: { type: Boolean, default: false },
});

const Expense = model("Expense", expenseSchema);
export default Expense
