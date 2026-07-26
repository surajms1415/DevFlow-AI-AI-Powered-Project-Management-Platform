const Task = require('../models/task.model');
const Project = require('../models/project.model');
const mongoose = require('mongoose');

const getProjectAnalytics = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, members: req.user._id });
    if (!project) return res.status(403).send({ message: 'Forbidden' });

    const statusDistribution = await Task.aggregate([
      { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const velocity = await Task.aggregate([
      { 
        $match: { 
          projectId: new mongoose.Types.ObjectId(projectId),
          status: 'Done',
          updatedAt: { $gte: thirtyDaysAgo } 
        } 
      },
      {
        $group: {
          _id: { $week: '$updatedAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const teamPerformance = await Task.aggregate([
      { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
      { $group: { _id: '$assignee', completed: { $sum: { $cond: [{ $eq: ['$status', 'Done'] }, 1, 0] } }, total: { $sum: 1 } } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { name: { $ifNull: ['$user.name', 'Unassigned'] }, completed: 1, total: 1 } }
    ]);

    res.send({
      statusDistribution: statusDistribution.map(s => ({ status: s._id, count: s.count })),
      velocity: velocity.map(v => ({ week: v._id, count: v.count })),
      teamPerformance
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjectAnalytics,
};
