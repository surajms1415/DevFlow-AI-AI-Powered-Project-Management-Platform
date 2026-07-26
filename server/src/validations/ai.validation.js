const Joi = require('joi');

const generateTasks = {
  body: Joi.object().keys({
    description: Joi.string().required().trim(),
  }),
};

const rewriteText = {
  body: Joi.object().keys({
    text: Joi.string().required().trim(),
  }),
};

const summarize = {
  body: Joi.object().keys({
    comments: Joi.array().items(Joi.string()).min(1).required(),
  }),
};

const generateSprint = {
  body: Joi.object().keys({
    backlogTasks: Joi.array().items(Joi.object()).min(1).required(),
  }),
};

const estimate = {
  body: Joi.object().keys({
    taskDetails: Joi.string().required().trim(),
  }),
};

const priority = {
  body: Joi.object().keys({
    taskDetails: Joi.string().required().trim(),
  }),
};

const risks = {
  body: Joi.object().keys({
    projectDetails: Joi.string().required().trim(),
  }),
};

const releaseNotes = {
  body: Joi.object().keys({
    completedTasks: Joi.array().items(Joi.object()).min(1).required(),
  }),
};

module.exports = {
  generateTasks,
  rewriteText,
  summarize,
  generateSprint,
  estimate,
  priority,
  risks,
  releaseNotes,
};
