import { Task } from "../models/tasksModel.mjs";
import asyncHandler from "express-async-handler";

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task was not found");
  }
  res.status(201).json({ task });
});

export const addTask = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

export const editTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    res.status(404);
    throw new Error("Task was not found");
  }
  res.status(200).json({ task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task was not found");
  }
  res.status(201).json({ task });
});
