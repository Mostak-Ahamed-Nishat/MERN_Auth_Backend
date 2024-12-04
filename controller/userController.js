//@DESC     Register user and send verification email
//@Route    /api/v1/users
//@access   POST | Public

import asyncHandler from "express-async-handler";
import userValidationSchema from "../validators/userValidator.js";
import User from "../model/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import generateJWTToken from "../utils/jwt.js";

// Controller to register a user
const registerUser = asyncHandler(async (req, res) => {
  // Validate user data
  const { error, value } = userValidationSchema.validate(req.body);

  // If validation fails, return an error response
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  // Destructure user information from validated value
  const { name, email, password, phone, role } = value;

  // Check if the user already exists in the database
  const isExistUser = await User.findOne({ email });

  // If user exists and is verified, return a message
  if (isExistUser && isExistUser.isVerified) {
    return res.status(200).json({
      success: false,
      message: "User already exists",
    });
  }

  // If user exists but is not verified
  if (isExistUser && !isExistUser.isVerified) {
    const remainingTime = isExistUser.verificationExpired - Date.now();

    // If the verification link is still valid, inform the user
    if (remainingTime > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, please verify your email.",
      });
    } else {
      // If the verification link has expired, resend the verification email
      const verificationToken = crypto.randomBytes(32).toString("hex");
      isExistUser.verificationToken = verificationToken;
      isExistUser.verificationExpired = Date.now() + 5 * 60 * 1000; // 5 minutes
      await isExistUser.save(); // Save the updated user information

      //Generate Link
      const verificationLink = `${process.env.DOMAIN_NAME_LOCALS}/api/v1/users/verify?token=${verificationToken}`;

      const message = `Please verify your email by clicking on the following link: ${verificationLink}`;
      // Send verification email to the newly created user
      await sendEmail(user.email, "Your Verification Code", message);

      return res.status(200).json({
        success: false,
        message: "Please verify your email.",
      });
    }
  } else {
    // If user does not exist, create a new user
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role,
      verificationToken,
      verificationExpired: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    const verificationLink = `${process.env.DOMAIN_NAME_LOCALS}/api/v1/users/verify?token=${verificationToken}`;
    const message = `Please verify your email by clicking on the following link: ${verificationLink}`;
    // Send verification email to the newly created user
    await sendEmail(user.email, "Your Verification Code", message);

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User has been created successfully. Please verify your email.",
    });
  }
});

//User verification controller
const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Check if the token is still valid
  if (Date.now() > user.verificationExpired) {
    return res.status(400).json({
      success: false,
      message: "Verification token has expired.Try again",
    });
  }

  user.isVerified = true;
  user.verificationToken = undefined; // Clear the verification token
  user.verificationExpired = undefined; // Clear the expiration time
  await user.save();

  res.redirect(`http://localhost:8000/api/v1/users/auth`);
});

//Auth controller
const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body();

  // If email or password is empty
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email or password can't be empty",
    });
  }

  const user = User.findOne({ email });
  //If user doesn't exist
  if (!user) {
    res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  //If user exist check password
  if (user && (await user.checkPassword(password))) {
    // Generate JWT TOKEN
    generateJWTToken(res, user._id);
    res.status(201).json({
      success: true,
      message: "Login in successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

const logOutController = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "User logged out successful",
  });
});

export { registerUser, verifyToken, authController, logOutController };
