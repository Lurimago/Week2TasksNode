// Models
const { User } = require("../models/user.model");
const { Task } = require("../models/task.model");
// const { Comment } = require('../models/comment.model');

const getAllActiveUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "status"],
      where: { status: "active" },
      include: [
        {
          model: Task,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({ name, email, password });

    // 201 -> Success and a resource has been created
    res.status(201).json({
      status: "success",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    // Update using a model's instance
    await user.update({ name, email });

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    const newUser = await user.update({ status: "inactive" });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllActiveUsers,
  createUser,
  updateUser,
  deleteUser,
};
