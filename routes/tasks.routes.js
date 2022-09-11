const express = require("express");

// Controllers
const {
  getAllTask,
  getTasksByStatus,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

// Middlewares
const {
  taskExists,
  taskStatusExists,
} = require("../middlewares/tasks.middlewares");
const {
  createTaskValidators,
} = require("../middlewares/validators.middlewares");

const tasksRouter = express.Router();

tasksRouter.get("/", getAllTask);

tasksRouter.get("/:status", taskStatusExists, getTasksByStatus);

tasksRouter.post("/", createTaskValidators, createTask);

tasksRouter.patch("/:id", taskExists, updateTask);

tasksRouter.delete("/:id", taskExists, deleteTask);

module.exports = { tasksRouter };
