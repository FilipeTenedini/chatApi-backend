import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .min(2)
    .max(10)
    .required(),
});

export default userSchema;
