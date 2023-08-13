import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoutes from "./Routes/AuthRoutes.js";

const app = express();
dotenv.config();
const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", AuthRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
