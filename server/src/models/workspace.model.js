const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['Owner', 'Admin', 'Member', 'Guest'],
    default: 'Member',
  },
});

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    settings: {
      isPublic: { type: Boolean, default: false },
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

workspaceSchema.index({ name: 'text' });

const Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;
