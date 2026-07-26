const User = require('../models/user.model');
const Workspace = require('../models/workspace.model');
const Project = require('../models/project.model');
const Task = require('../models/task.model');

const globalSearch = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 5 } = req.query;
    if (!q) {
      return res.status(400).send({ message: 'Search query is required' });
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const limitNum = parseInt(limit, 10);

    const searchQuery = { $text: { $search: q } };
    const sortQuery = { score: { $meta: 'textScore' } };
    const projection = { score: { $meta: 'textScore' } };

    const [users, workspaces, projects, tasks] = await Promise.all([
      User.find(searchQuery, projection).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Workspace.find(searchQuery, projection).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Project.find(searchQuery, projection).sort(sortQuery).skip(skip).limit(limitNum).lean(),
      Task.find(searchQuery, projection).sort(sortQuery).skip(skip).limit(limitNum).lean()
    ]);

    const results = [
      ...users.map(u => ({ ...u, type: 'user' })),
      ...workspaces.map(w => ({ ...w, type: 'workspace' })),
      ...projects.map(p => ({ ...p, type: 'project' })),
      ...tasks.map(t => ({ ...t, type: 'task' }))
    ].sort((a, b) => b.score - a.score);

    res.send({ results });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  globalSearch,
};
