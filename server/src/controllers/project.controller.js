const Project = require('../models/project.model');
const Workspace = require('../models/workspace.model');
const ActivityLog = require('../models/activity.model');

const logActivity = async (userId, projectId, action, targetName) => {
  await ActivityLog.create({ user: userId, projectId, action, targetName });
};

const createProject = async (req, res, next) => {
  try {
    const workspace = await Workspace.findOne({ _id: req.body.workspaceId, 'members.user': req.user._id });
    if (!workspace) return res.status(403).send({ message: 'Forbidden: You are not a member of this workspace' });

    const project = await Project.create({
      ...req.body,
      owner: req.user._id,
      members: [req.user._id]
    });
    
    await logActivity(req.user._id, project._id, 'Created project', project.name);
    res.status(201).send(project);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const { workspaceId, search, sortBy, limit = 10, page = 1 } = req.query;
    
    const filter = { members: req.user._id };
    if (workspaceId) filter.workspaceId = workspaceId;
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;
    const sort = sortBy ? { [sortBy.split(':')[0]]: sortBy.split(':')[1] === 'desc' ? -1 : 1 } : { createdAt: -1 };

    const projects = await Project.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('owner', 'name email')
      .populate('workspaceId', 'name');

    const totalResults = await Project.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / limit);

    res.send({
      results: projects,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      totalResults,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, members: req.user._id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).send({ message: 'Project not found' });
    
    await logActivity(req.user._id, project._id, 'Updated project', project.name);
    res.send(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!project) return res.status(404).send({ message: 'Project not found or unauthorized (must be owner)' });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
