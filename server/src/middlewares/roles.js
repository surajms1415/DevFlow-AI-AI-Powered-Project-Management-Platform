const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ message: 'Please authenticate' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: 'Forbidden' });
    }
    
    next();
  };
};

module.exports = authorize;
