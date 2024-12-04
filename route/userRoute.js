import express from "express";
import {
  authController,
  registerUser,
  verifyToken,
} from "../controller/userController.js";

const router = express.Router();

// Register a user
router.post("/users", registerUser);

// Verification route should be a GET request
router.get("/users/verify", verifyToken); // Change this to GET

router.get("/users/auth", authController);

// Authenticate a user and get token
router.post("/users/auth", authController);

// Logout user and clear cookie
router.post("/users/logout");

// Get user profile
router.get("/users/profile");

// Update profile
router.put("/users/profile");

export default router;
