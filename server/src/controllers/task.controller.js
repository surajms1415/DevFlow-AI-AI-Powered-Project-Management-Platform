const Task = require('../models/task.model');
const Project = require('../models/project.model');
const ActivityLog = require('../models/activity.model');

const logActivity = async (userId, projectId, action, targetName) => {
  await ActivityLog.create({ user: userId, projectId, action, targetName });
};

const createTask = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.body.projectId, members: req.user._id });
    if (!project) return res.status(403).send({ message: 'Forbidden: You are not a member of this project' });

    const task = await Task.create(req.body);
    await logActivity(req.user._id, project._id, 'Created task', task.title);
    res.status(201).send(task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.query.projectId, members: req.user._id });
    if (!project) return res.status(403).send({ message: 'Forbidden' });

    const tasks = await Task.find({ projectId: req.query.projectId }).sort('order');
    res.send(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ message: 'Task not found' });

    const project = await Project.findOne({ _id: task.projectId, members: req.user._id });
    if (!project) return res.status(403).send({ message: 'Forbidden' });

    Object.assign(task, req.body);
    await task.save();

    await logActivity(req.user._id, project._id, 'Updated task', task.title);
    res.send(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
};
