const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Please authenticate' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    if (payload.type !== 'access') {
      return res.status(401).send({ message: 'Invalid token type' });
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Please authenticate' });
  }
};

module.exports = auth;
