import Joi from 'joi';
import sanitizeRequest from './sanitize-html.js';

const confirmTypeMsg = (value) => {
  if (value === 'message' || value === 'private_message') return value;

  throw new Error('Invalid Message Type');
};

const messageSchema = Joi.object({
  to: Joi
    .string()
    .trim(true)
    .min(1)
    .custom(sanitizeRequest)
    .required(),
  text: Joi
    .string()
    .trim(true)
    .min(1)
    .custom(sanitizeRequest)
    .required(),
  type: Joi
    .string()
    .trim(true)
    .custom(confirmTypeMsg)
    .custom(sanitizeRequest)
    .required(),
  from: Joi
    .string()
    .trim(true)
    .custom(sanitizeRequest)
    .required(),
});

export default messageSchema;
