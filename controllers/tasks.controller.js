// Models
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: [
        "id",
        "userId",
        "title",
        "startDate",
        "limitDate",
        "finishDate",
        "status",
      ],
      include: { model: User, attributes: ["id", "name", "email", "status"] },
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Task.findAll({
      where: { status },
    });
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;

    const newTask = await Task.create({ title, userId, startDate, limitDate });

    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  const { task } = req;
  const { finishDate } = req.body;

  const newTask = await task.update({ finishDate });
  const limit = Date.parse(task.limitDate);
  const time = Date.parse(finishDate);

  const timedifference = limit - time;

  if (timedifference > 0) {
    await task.update({ finishDate, status: "completed" });
  } else if (timedifference < 0) {
    await task.update({ finishDate, status: "late" });
  }
  res.status(200).json({
    status: "success",
    data: { newTask },
  });

  res.status(400).json({
    status: "error",
    task,
  });
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    await task.update({ status: "cancelled" });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTask,
  getTasksByStatus,
  createTask,
  updateTask,
  deleteTask,
};
