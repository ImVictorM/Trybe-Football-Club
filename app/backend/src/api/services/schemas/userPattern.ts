import * as Joi from 'joi';

const userPattern = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email or password',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Invalid email or password',
  }),
}).messages({
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
});

export default userPattern;
