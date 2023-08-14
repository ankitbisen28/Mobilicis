import User from "../Models/UserSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

dotenv.config();

const secretKey = process.env.secretKey;

export const login = async (req, res) => {
  try {
    // Validate input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // checking if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email Not found");

    //checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Pass");

    const token = jwt.sign({ id: user._id }, secretKey);
    req.header("auth-token", token);

   res.status(201).json({ token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    // Validate input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // checking if user already exist
    const emailExist = await User.findOne({ email: email });
    if (emailExist)
      return res.status(400).send({ message: "email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: "1d",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
