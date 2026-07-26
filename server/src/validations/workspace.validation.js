const Joi = require('joi');

const createWorkspace = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    avatar: Joi.string().uri().allow(''),
    settings: Joi.object({
      isPublic: Joi.boolean()
    }),
  }),
};

const updateWorkspace = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().trim(),
    avatar: Joi.string().uri().allow(''),
    settings: Joi.object({
      isPublic: Joi.boolean()
    }),
  }).min(1),
};

const inviteMember = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    role: Joi.string().valid('Admin', 'Member', 'Guest').default('Member'),
  }),
};

const removeMember = {
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
};

module.exports = {
  createWorkspace,
  updateWorkspace,
  inviteMember,
  removeMember,
};
