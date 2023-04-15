import Joi from 'joi';

const schema = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .min(2)
    .max(10)
    .required(),
});

export default schema;
