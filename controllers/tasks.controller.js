// Models
const { Task } = require('../models/tasks.model');
const { User } = require('../models/user.model');
// const { Comment } = require('../models/comment.model');

const getAllTask = async (req, res) => {
	try {
		const tasks = await Task.findAll({
			attributes: ['id', 'title', 'createdAt'],
			include: [
				{ model: User, attributes: ['id', 'name'] },
			],
		});

		res.status(200).json({
			status: 'success',
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
		const { title, content, userId } = req.body;

		const newTask = await Task.create({ title, content, userId });

		res.status(201).json({
			status: 'success',
			data: { newTask },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateTask = async (req, res) => {
	try {
		const { title, content } = req.body;
		const { tasks } = req;

		await tasks.update({ title, content });

		res.status(200).json({
			status: 'success',
			data: { tasks },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteTask = async (req, res) => {
	try {
		const { tasks } = req;

		await tasks.update({ status: 'deleted' });

		res.status(200).json({
			status: 'success',
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllTask,
	createTask,
	updateTask,
	deleteTask,
};
