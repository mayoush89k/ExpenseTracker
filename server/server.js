import { config } from "dotenv";
import express from "express";
import expenseRoutes from "./routes/expense.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/db.connection.js";
import {errorHandler} from './middleware/errorMiddleware.js'
import {isAuth} from "./middleware/auth.middleware.js";
import cors from 'cors'
import sendWeeklyEmails from "./utils/emailService.js";

const app = express();
app.use(cors())

app.use(express.json());
config();

app.use("/expenses",isAuth, expenseRoutes);
// app.use("/expenses", expenseRoutes);
app.use("/users", userRoutes)
app.post('/emails' , sendWeeklyEmails)
app.use(errorHandler)

const port = process.env.port || 3434;
connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on ${port}`));
});
