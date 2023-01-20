import express from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} from "../controllers/taskController.mjs";

export const router = express.Router();

router.route("/").get(getTasks).post(addTask);
router.route("/:id").patch(editTask).delete(deleteTask).get(getTask);
