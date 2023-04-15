import Joi from 'joi';

const method = (value) => {
  if (value === 'message' || value === 'private_message') return value;

  throw new Error('Invalid Type');
};

const messageSchema = Joi.object({
  to: Joi.string().min(1).required(),
  text: Joi.string().min(1).required(),
  type: Joi.custom(method).required(),
  from: Joi.required(),
});

export default messageSchema;
