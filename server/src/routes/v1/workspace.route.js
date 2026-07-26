const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const workspaceValidation = require('../../validations/workspace.validation');
const workspaceController = require('../../controllers/workspace.controller');

const router = express.Router();

router.use(auth);

router
  .route('/')
  .post(validate(workspaceValidation.createWorkspace), workspaceController.createWorkspace)
  .get(workspaceController.getWorkspaces);

router
  .route('/:id')
  .patch(validate(workspaceValidation.updateWorkspace), workspaceController.updateWorkspace);

router
  .route('/:id/members')
  .post(validate(workspaceValidation.inviteMember), workspaceController.inviteMember);

router
  .route('/:id/members/:userId')
  .delete(validate(workspaceValidation.removeMember), workspaceController.removeMember);

module.exports = router;
