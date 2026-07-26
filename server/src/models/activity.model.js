const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    workspaceId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Workspace',
    },
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    action: {
      type: String,
      required: true,
    },
    targetName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model('ActivityLog', activitySchema);
module.exports = ActivityLog;
