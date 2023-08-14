import express from "express";
import { signup, login } from "../Controller/Auth.js";
import { body } from "express-validator";

const router = express.Router();

// http://localhost:5000/api
router.post(
  "/signup",
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  signup
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").notEmpty().withMessage("Password is required."),
  login
);

export default router;
