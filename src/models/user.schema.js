import Joi from 'joi';
import dayjs from 'dayjs';

const schema = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .min(2)
    .max(10)
    .required(),
});

export default schema;
