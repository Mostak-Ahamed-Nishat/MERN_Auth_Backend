import express from "express";
const router = express.Router();

//Register a user
router.POST("/users");
//Authenticate a user and get token
router.POST("/users/auth");
// Logout user and clear cookie
router.POST("/users/logout");
// Get user profile
router.get("/users/profile");
// Update profile
router.put("/users/profile");

export default router;
