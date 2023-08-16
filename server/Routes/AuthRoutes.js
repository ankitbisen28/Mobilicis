import express from "express";
import { signup, login, getUser } from "../Controller/User.js";
import { body } from "express-validator";
import path from "path";
import multer from "multer";

const router = express.Router();

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Uploads will be saved in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// http://localhost:5000/api
router.post(
  "/signup",
  [
    upload.single("image"),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  signup
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").notEmpty().withMessage("Password is required."),
  login
);
router.get("/user/:userId", getUser);

export default router;
