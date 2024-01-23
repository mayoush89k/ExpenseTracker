import jwt from "jsonwebtoken";
import STATUS_CODES from "../constants/statusCodes.js";
import User from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader) {
      console.log('authHeader: ', authHeader);
      token = authHeader.split(" ")[1];
      console.log('token: ', token);

      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      console.log('decoded: ', decoded);
        if (!decoded) {
          console.error(`ERROR DECODING ${token}`);
          return res.status(STATUS_CODES.UNAUTHORIZED).send({msg:"Invalid Token"});
        }
        console.log("decoded ", decoded);

        const { id } = decoded;

        const user = await User.findById(id);
        console.log('user: ', user);
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        req.user = user;
        next();
    } else {
        return res.status(STATUS_CODES.UNAUTHORIZED).send({message: "Sign In First"});
      }
  } catch (error) {
    next(error);
  }
};
