const Workspace = require('../models/workspace.model');
const User = require('../models/user.model');
const ActivityLog = require('../models/activity.model');

const logActivity = async (userId, workspaceId, action, targetName) => {
  await ActivityLog.create({ user: userId, workspaceId, action, targetName });
};

const createWorkspace = async (req, res, next) => {
  try {
    const workspace = await Workspace.create({
      ...req.body,
      owner: req.user._id,
      members: [{ user: req.user._id, role: 'Owner' }]
    });
    await logActivity(req.user._id, workspace._id, 'Created workspace', workspace.name);
    res.status(201).send(workspace);
  } catch (error) {
    next(error);
  }
};

const getWorkspaces = async (req, res, next) => {
  try {
    const workspaces = await Workspace.find({ 'members.user': req.user._id })
      .populate('owner', 'name email')
      .populate('members.user', 'name email');
    res.send(workspaces);
  } catch (error) {
    next(error);
  }
};

const updateWorkspace = async (req, res, next) => {
  try {
    const workspace = await Workspace.findOneAndUpdate(
      { _id: req.params.id, 'members.user': req.user._id, 'members.role': { $in: ['Owner', 'Admin'] } },
      req.body,
      { new: true }
    );
    if (!workspace) return res.status(404).send({ message: 'Workspace not found or unauthorized' });
    await logActivity(req.user._id, workspace._id, 'Updated workspace settings', workspace.name);
    res.send(workspace);
  } catch (error) {
    next(error);
  }
};

const inviteMember = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const userToInvite = await User.findOne({ email });
    if (!userToInvite) return res.status(404).send({ message: 'User not found' });

    const workspace = await Workspace.findOne({ _id: req.params.id, 'members.user': req.user._id, 'members.role': { $in: ['Owner', 'Admin'] } });
    if (!workspace) return res.status(404).send({ message: 'Workspace not found or unauthorized' });

    if (workspace.members.some(m => m.user.toString() === userToInvite._id.toString())) {
      return res.status(400).send({ message: 'User is already a member' });
    }

    workspace.members.push({ user: userToInvite._id, role });
    await workspace.save();
    
    await logActivity(req.user._id, workspace._id, `Invited ${userToInvite.name} as ${role}`, workspace.name);
    res.send(workspace);
  } catch (error) {
    next(error);
  }
};

const removeMember = async (req, res, next) => {
  try {
    const workspace = await Workspace.findOne({ _id: req.params.id, 'members.user': req.user._id, 'members.role': { $in: ['Owner', 'Admin'] } });
    if (!workspace) return res.status(404).send({ message: 'Workspace not found or unauthorized' });

    if (req.params.userId === workspace.owner.toString()) {
      return res.status(400).send({ message: 'Cannot remove the workspace owner' });
    }

    workspace.members = workspace.members.filter(m => m.user.toString() !== req.params.userId);
    await workspace.save();

    await logActivity(req.user._id, workspace._id, 'Removed a member', workspace.name);
    res.send(workspace);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  updateWorkspace,
  inviteMember,
  removeMember,
};
