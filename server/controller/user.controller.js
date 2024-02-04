import STATUS_CODES from "../constants/statusCodes.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";
import { isValidObjectId } from "mongoose";

const sendError = (res, statusCode, errorMsg) => {
  res.status(statusCode);
  throw new Error(errorMsg);
};

export const createUser = async (req, res, next) => {
  try {
    const { name, username, password, email } = req.body;
    if (!(username && password && email)) {
      return sendError(
        res,
        STATUS_CODES.BAD_REQUEST,
        "Username, Email and Password are required"
      );
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return sendError(res, STATUS_CODES.CONFLICT, "Username already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username,
      name: name || username,
      email,
      password: hashedPassword,
      expenses: [],
    });

    res.status(STATUS_CODES.CREATED).send(newUser);
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return sendError(
        res,
        STATUS_CODES.BAD_REQUEST,
        "Username and Password are required"
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return sendError(res, STATUS_CODES.NOT_FOUND, "Username is not found");
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, "Incorrect Password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    console.log("token", token);
    res.send({ user: user, token: token });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, STATUS_CODES.BAD_REQUEST, "Invalid Id");
    }

    const user = await User.findById(id).populate("Expense");
    if (!user) {
      return sendError(res, STATUS_CODES.NOT_FOUND, "User is not Found");
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("delete user id : ", id);
    // check if the user exists or not
    let user = await User.findOne({ _id: id });
    if (!user) {
      return sendError(res, STATUS_CODES.NOT_FOUND, "User Not Found");
    }
    await Expense.deleteMany({user:id})
    await User.deleteOne({ _id: id })
      .then(() => {
        res.json({ message: "User Deleted Successfully" });
      });
  } catch (error) {
    next(error);
  }
};

export const getEmails = async (req, res, next) => {
  try {
    const users = await User.find({});
    const emails = users.map((user) => user.email);
    console.log(emails);
    res.send("ok");
  } catch (error) {
    next(error);
  }
};
