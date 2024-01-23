import dotenv from "dotenv";
import STATUS_CODE from "../constants/statusCodes.js";
import { emailConfig, transporter } from "../utils/emailConfigure.js";
import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";
import moment from "moment";

export const sendEmail = async (req, res, next) => {
  const currentDate = new Date();
  const lastWeekStartDate = moment(currentDate)
    .subtract(1, "weeks")
    .startOf("week")
    .toDate();
  const lastWeekEndDate = moment(currentDate)
    .subtract(1, "weeks")
    .endOf("week")
    .toDate();

  try {
    const users = await User.find({});
    const emails = users.map((user) => user.email);
    console.log(emails);
    users.map(async (user) => {
      const expenses = await Expense.find({
        user: users[0]._id,
        transactionDate: {
          $gte: lastWeekStartDate,
          $lt: lastWeekEndDate,
        },
      }).populate("user");
      console.log("expenses: ", expenses);

      const emailOptions = emailConfig(user.email, expenses);

      transporter.sendMail(emailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });

    res.send("ok");
  } catch (error) {
    next(error);
  }
};
