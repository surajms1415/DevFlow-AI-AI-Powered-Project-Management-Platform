const Joi = require('joi');

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    description: Joi.string().allow(''),
    projectId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    status: Joi.string().valid('Backlog', 'Todo', 'In Progress', 'Review', 'Done'),
    priority: Joi.string().valid('Low', 'Medium', 'High', 'Urgent'),
    assignee: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
    labels: Joi.array().items(Joi.string()),
    dueDate: Joi.date().iso().allow(null),
    order: Joi.number(),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    projectId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().trim(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('Backlog', 'Todo', 'In Progress', 'Review', 'Done'),
    priority: Joi.string().valid('Low', 'Medium', 'High', 'Urgent'),
    assignee: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
    labels: Joi.array().items(Joi.string()),
    dueDate: Joi.date().iso().allow(null),
    order: Joi.number(),
  }).min(1),
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
};
