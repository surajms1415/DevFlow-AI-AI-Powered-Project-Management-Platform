const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const validSchema = Object.keys(schema).reduce((acc, key) => {
    if (schema[key]) {
      acc[key] = Joi.compile(schema[key]);
    }
    return acc;
  }, {});

  const object = Object.keys(validSchema).reduce((acc, key) => {
    if (Object.keys(req).includes(key)) {
      acc[key] = req[key];
    }
    return acc;
  }, {});

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).send({ message: errorMessage });
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
