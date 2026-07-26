const Joi = require('joi');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    description: Joi.string().allow('').trim(),
    workspaceId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    tags: Joi.array().items(Joi.string().trim()),
    dueDate: Joi.date().iso(),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    workspaceId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().trim(),
    description: Joi.string().allow('').trim(),
    tags: Joi.array().items(Joi.string().trim()),
    dueDate: Joi.date().iso(),
    status: Joi.string().valid('Active', 'Completed', 'Archived'),
  }).min(1),
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
};
