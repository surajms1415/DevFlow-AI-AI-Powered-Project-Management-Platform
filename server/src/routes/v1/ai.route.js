const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const aiValidation = require('../../validations/ai.validation');
const aiController = require('../../controllers/ai.controller');

const router = express.Router();

router.use(auth);

router.post('/generate-tasks', validate(aiValidation.generateTasks), aiController.generateProjectTasks);
router.post('/rewrite-description', validate(aiValidation.rewriteText), aiController.rewriteDescription);
router.post('/summarize-discussion', validate(aiValidation.summarize), aiController.summarizeDiscussion);
router.post('/generate-sprint-plan', validate(aiValidation.generateSprint), aiController.generateSprintPlan);
router.post('/estimate-time', validate(aiValidation.estimate), aiController.estimateTime);
router.post('/suggest-priority', validate(aiValidation.priority), aiController.suggestPriority);
router.post('/suggest-risks', validate(aiValidation.risks), aiController.suggestRisks);
router.post('/generate-release-notes', validate(aiValidation.releaseNotes), aiController.generateReleaseNotes);

module.exports = router;
