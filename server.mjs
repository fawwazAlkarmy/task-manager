import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { notFound } from "./middlewares/notFound.mjs";
import { errorHandler } from "./middlewares/erorr.mjs";
import { router } from "./routes/taskRoutes.mjs";

const tasksRoutes = router;

const port = process.env.PORT;

const app = express();
// middlewares
app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/tasks", tasksRoutes);
app.use(notFound);
app.use(errorHandler);

const dbURI = process.env.MONGO_URI;

// connect to DB
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbURI, { useNewUrlParser: true });
    app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();
