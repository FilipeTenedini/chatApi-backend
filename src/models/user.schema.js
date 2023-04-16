import Joi from 'joi';
import sanitizeRequest from './sanitize-html.js';

const userSchema = Joi.object({
  name: Joi
    .string()
    .trim()
    .custom(sanitizeRequest)
    .min(1)
    .trim(true)
    .required(),
});

export default userSchema;
