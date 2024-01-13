import { config } from "dotenv";
import express from "express";
import expenseRoutes from "./routes/expense.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/db.connection.js";
import {errorHandler} from './middleware/errorMiddleware.js'
import {isAuth} from "./middleware/auth.middleware.js";

const app = express();

app.use(express.json());
config();

app.use("/expenses",isAuth, expenseRoutes);
app.use("/users", userRoutes)
app.use(errorHandler)

const port = process.env.port || 3000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on ${port}`));
});
