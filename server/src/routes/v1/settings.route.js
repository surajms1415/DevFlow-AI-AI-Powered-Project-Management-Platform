const express = require('express');
const auth = require('../../middlewares/auth');
const settingsController = require('../../controllers/settings.controller');

const router = express.Router();

router.use(auth);

router.patch('/profile', settingsController.updateProfile);
router.patch('/password', settingsController.updatePassword);
router.patch('/preferences', settingsController.updatePreferences);
router.delete('/account', settingsController.deleteAccount);

module.exports = router;
