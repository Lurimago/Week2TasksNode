// Models
const { User } = require("./user.model");
const { Task } = require("./task.model");

const initModels = () => {
  // 1 User <----> M Post
  User.hasMany(Task, { foreignKey: "userId" });
  Task.belongsTo(User);
};

module.exports = { initModels };
