require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/user.model');
const Workspace = require('../src/models/workspace.model');
const Project = require('../src/models/project.model');
const Task = require('../src/models/task.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/devflow-ai';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB for seeding...');

    await User.deleteMany({});
    await Workspace.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 10);
    const demoUser = await User.create({
      name: 'Demo Admin',
      email: 'admin@devflow.ai',
      password: passwordHash,
      role: 'Admin'
    });

    const workspace = await Workspace.create({
      name: 'Alpha Workspace',
      owner: demoUser._id,
      members: [{ user: demoUser._id, role: 'Owner' }]
    });

    const project = await Project.create({
      name: 'Frontend Redesign',
      description: 'Overhaul the UI using React and Tailwind',
      workspaceId: workspace._id,
      owner: demoUser._id,
      members: [demoUser._id]
    });

    await Task.create([
      { title: 'Setup Vite', description: 'Initialize project', status: 'Done', priority: 'High', projectId: project._id, assignee: demoUser._id },
      { title: 'Build Kanban', description: 'Drag and drop board', status: 'In Progress', priority: 'Urgent', projectId: project._id, assignee: demoUser._id },
      { title: 'Write Tests', description: 'Jest and RTL', status: 'Todo', priority: 'Medium', projectId: project._id }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
