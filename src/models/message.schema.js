import Joi from 'joi';
import sanitizeRequest from './sanitize-html.js';

const confirmTypeMsg = (value) => {
  if (value === 'message' || value === 'private_message') return value;

  throw new Error('Invalid Type');
};

const messageSchema = Joi.object({
  to: Joi.string().min(1).custom(sanitizeRequest).required(),
  text: Joi.string().min(1).custom(sanitizeRequest).required(),
  type: Joi.custom(confirmTypeMsg).custom(sanitizeRequest).required(),
  from: Joi.custom(sanitizeRequest).required(),
});

export default messageSchema;
