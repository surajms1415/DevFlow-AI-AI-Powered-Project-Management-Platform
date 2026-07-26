const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    workspaceId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      }
    ],
    tags: [
      {
        type: String,
        trim: true,
      }
    ],
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Archived'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

// Enable search indexing on name and description
projectSchema.index({ name: 'text', description: 'text' });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
