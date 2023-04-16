import Joi from 'joi';
import sanitizeRequest from './sanitize-html.js';

const userSchema = Joi.object({
  name: Joi
    .string()
    .min(2)
    .custom(sanitizeRequest)
    .required(),
});

export default userSchema;
