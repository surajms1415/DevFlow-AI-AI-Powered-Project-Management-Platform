const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Backlog', 'Todo', 'In Progress', 'Review', 'Done'],
      default: 'Backlog',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    labels: [
      {
        type: String,
        trim: true,
      }
    ],
    dueDate: {
      type: Date,
    },
    attachments: [
      {
        url: String,
        name: String,
      }
    ],
    order: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ title: 'text', description: 'text' });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
