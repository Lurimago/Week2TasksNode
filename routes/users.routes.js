const express = require("express");
const { body, validationResult } = require("express-validator");

// Controllers
const {
  getAllActiveUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const usersRouter = express.Router();

usersRouter.get("/", getAllActiveUsers);

usersRouter.post("/", createUserValidators, createUser);

usersRouter.patch("/:id", userExists, updateUser);

usersRouter.delete("/:id", userExists, deleteUser);

module.exports = { usersRouter };
