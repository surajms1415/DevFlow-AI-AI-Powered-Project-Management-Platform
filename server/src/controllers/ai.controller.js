const aiService = require('../services/ai.service');

const handleError = (error, res) => {
  console.error('AI Service Error:', error.message);
  res.status(503).send({ message: 'AI processing failed. Check your API key and quota.' });
};

const generateProjectTasks = async (req, res) => {
  try {
    const tasks = await aiService.generateProjectTasks(req.body.description);
    res.send({ tasks });
  } catch (error) {
    handleError(error, res);
  }
};

const rewriteDescription = async (req, res) => {
  try {
    const text = await aiService.rewriteDescription(req.body.text);
    res.send({ text });
  } catch (error) {
    handleError(error, res);
  }
};

const summarizeDiscussion = async (req, res) => {
  try {
    const summary = await aiService.summarizeDiscussion(req.body.comments);
    res.send({ summary });
  } catch (error) {
    handleError(error, res);
  }
};

const generateSprintPlan = async (req, res) => {
  try {
    const plan = await aiService.generateSprintPlan(req.body.backlogTasks);
    res.send({ plan });
  } catch (error) {
    handleError(error, res);
  }
};

const estimateTime = async (req, res) => {
  try {
    const estimate = await aiService.estimateTime(req.body.taskDetails);
    res.send({ estimate });
  } catch (error) {
    handleError(error, res);
  }
};

const suggestPriority = async (req, res) => {
  try {
    const priority = await aiService.suggestPriority(req.body.taskDetails);
    res.send({ priority });
  } catch (error) {
    handleError(error, res);
  }
};

const suggestRisks = async (req, res) => {
  try {
    const risks = await aiService.suggestRisks(req.body.projectDetails);
    res.send({ risks });
  } catch (error) {
    handleError(error, res);
  }
};

const generateReleaseNotes = async (req, res) => {
  try {
    const notes = await aiService.generateReleaseNotes(req.body.completedTasks);
    res.send({ notes });
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  generateProjectTasks,
  rewriteDescription,
  summarizeDiscussion,
  generateSprintPlan,
  estimateTime,
  suggestPriority,
  suggestRisks,
  generateReleaseNotes,
};
