// Models
const { User } = require('./user.model');
const { Task } = require('./tasks.model');
// const { Comment } = require('./comment.model');

const initModels = () => {
	// 1 User <----> M Post
	User.hasMany(Task, { foreignKey: 'userId' });
	Task.belongsTo(User);

	// 1 Post <----> M Comment
	// Post.hasMany(Comment, { foreignKey: 'postId' });
	// Comment.belongsTo(Post);

	// // 1 User <----> M Comment
	// User.hasMany(Comment, { foreignKey: 'userId' });
	// Comment.belongsTo(User);
};

module.exports = { initModels };
