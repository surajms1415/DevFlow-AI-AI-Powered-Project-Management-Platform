const express = require('express');
const auth = require('../../middlewares/auth');
const searchController = require('../../controllers/search.controller');

const router = express.Router();

router.use(auth);
router.get('/', searchController.globalSearch);

module.exports = router;
