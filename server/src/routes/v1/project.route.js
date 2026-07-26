const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const projectValidation = require('../../validations/project.validation');
const projectController = require('../../controllers/project.controller');

const router = express.Router();

router.use(auth);

router
  .route('/')
  .post(validate(projectValidation.createProject), projectController.createProject)
  .get(validate(projectValidation.getProjects), projectController.getProjects);

router
  .route('/:id')
  .patch(validate(projectValidation.updateProject), projectController.updateProject)
  .delete(projectController.deleteProject);

router.post('/:id/archive', async (req, res, next) => {
  req.body = { status: 'Archived' };
  return projectController.updateProject(req, res, next);
});

module.exports = router;
