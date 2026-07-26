const express = require('express');
const auth = require('../../middlewares/auth');
const analyticsController = require('../../controllers/analytics.controller');

const router = express.Router();

router.use(auth);
router.get('/:projectId', analyticsController.getProjectAnalytics);

module.exports = router;
