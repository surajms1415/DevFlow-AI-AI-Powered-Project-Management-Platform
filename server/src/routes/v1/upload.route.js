const express = require('express');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.use(auth);

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded or invalid format' });
  }
  res.status(200).send({
    url: req.file.path,
    name: req.file.originalname,
  });
});

module.exports = router;
