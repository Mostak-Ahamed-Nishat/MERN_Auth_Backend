//@DESC     Register user,Send verification mail
//@Route    /api/v1/users
//@access   POST | Public
import asyncHandler from "express-async-handler";
import userValidationSchema, { message } from "../validators/userValidator";
import User from "../model/userModel";

const registerUser = asyncHandler(async (req, res) => {
  //Validate user data
  const { error, value } = userValidationSchema.validate(req.body);
  //If any error occurred throw error
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  //Get the user information
  const { name, email, password, phone, role } = value;

  //Check is the user already exist or not
  const isExistUser = User.findOne({ email });
  if (isExistUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exist",
    });
  }

  //Create a verification link

  const user = User.create({});
});
