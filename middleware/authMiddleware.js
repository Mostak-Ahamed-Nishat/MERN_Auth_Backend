import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt; //This able to do because of cookie parser
  if (token) {
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      //Get the user

      //Set user id to every request
      req.user = await User.findById({ _id: decodeToken.user.userId }).select(
        "-password"
      );
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
});
