const express = require('express');
const authRoute = require('./auth.route');
const workspaceRoute = require('./workspace.route');
const projectRoute = require('./project.route');
const taskRoute = require('./task.route');
const aiRoute = require('./ai.route');
const analyticsRoute = require('./analytics.route');
const notificationRoute = require('./notification.route');
const uploadRoute = require('./upload.route');
const searchRoute = require('./search.route');
const settingsRoute = require('./settings.route');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/workspaces', workspaceRoute);
router.use('/projects', projectRoute);
router.use('/tasks', taskRoute);
router.use('/ai', aiRoute);
router.use('/analytics', analyticsRoute);
router.use('/notifications', notificationRoute);
router.use('/upload', uploadRoute);
router.use('/search', searchRoute);
router.use('/settings', settingsRoute);

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'DevFlow AI API is running' });
});

module.exports = router;
