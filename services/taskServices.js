const TaskModel = require("../models/taskModel");
const slugify = require("slugify");

// @desc     Create Task
// @Route    POST /api/v1/api-nodejs-todolist
// @access   Public
exports.createTask = async (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    completed,
    recurring,
    comment,
    feedback,
    rating,
    image,
  } = req.body;
  const task = await TaskModel.create({
    title,
    slug: slugify(title),
    description,
    status,
    priority,
    completed,
    recurring,
    comment,
    feedback,
    rating,
    image,
  });
  res.status(201).json({ data: task });
};


// @desc     Get list of Task
// @Route    GET /api/v1/api-nodejs-todolist
// @access   Public
exports.getAllTasks = async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const tasks = await TaskModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: tasks.length,
    page,
    data: tasks,
  });
};


// @desc     Get task by Id
// @Route    GET /api/v1/api-nodejs-todolist/:id
// @access   Public
exports.getTasksById = async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ data: task });
};

// @desc     Update Task by Id
// @Route    PUT /api/v1/api-nodejs-todolist/:id
// @access   Public
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { description } = req.body;
  const { status } = req.body;
  const updateTask = await TaskModel.findOneAndUpdate(
    { _id: id },
    { title, slug: slugify(title), description, status },
    { new: true }
  );
  if (!updateTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ data: updateTask });
};


// @desc     Delete Task by Id
// @Route    DELETE /api/v1/api-nodejs-todolist/:id
// @access   Public
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const Task = await TaskModel.findByIdAndDelete(id);
  if (!Task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
};
