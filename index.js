import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import cityRoute from "./routes/city.js";
import listRoute from "./routes/list.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/city", cityRoute);
app.use("/api/list", listRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ufcpe.mongodb.net/${DB_NAME}`
    );

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
