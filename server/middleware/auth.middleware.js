import jwt from "jsonwebtoken";
import STATUS_CODES from "../constants/statusCodes.js";
import User from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader) {
      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
          console.error(`ERROR DECODING ${token}`);
          return res.status(STATUS_CODES.UNAUTHORIZED).send({msg:"Invalid Token"});
        }
        console.log("decoded ", decoded);

        const { id } = decoded;

        const user = await User.findById(id);
        console.log('user: ', user);
        if (!user) {
          return res.status(404).send({ msg: "User not found" });
        }
        req.user = user;
        next();
    } else {
        return res.status(STATUS_CODES.UNAUTHORIZED).send({msg: "Sign In First"});
      }
  } catch (error) {
    next(error);
  }
};
