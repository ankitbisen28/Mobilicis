import User from "../Models/UserSchema.js";
import Profile from "../Models/ProfileSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

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

    const { name, phone, about, skill, email, password } = req.body;

    // checking if user already exist
    const emailExist = await User.findOne({ email: email });
    if (emailExist)
      return res.status(400).send({ message: "email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    //  the uploaded file information through req.file
    const image = req.file.path;

    const newProfile = await Profile.create({
      user: newUser._id,
      name,
      phone,
      about,
      skill,
      image,
    });
    await newProfile.save();
    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: "1d",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json({ user, profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).send("No Profile with that id");

    const { name, phone, about, skill } = req.body;

    //  the uploaded file information through req.file
    const image = req.file.path;

    const profile = await Profile.findOneAndUpdate({
      user: userId,
      name,
      phone,
      about,
      skill,
      image,
    });

    // Respond with a success message or updated resource
    res.json({
      message: "User updated successfully",
      updatedUser: profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
