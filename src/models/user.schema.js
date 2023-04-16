import Joi from 'joi';
import sanitizeRequest from './sanitize-html.js';

const userSchema = Joi.object({
  name: Joi
    .string()
    .custom(sanitizeRequest)
    .min(1)
    .required(),
});

const teste = userSchema.validate({ name: '<script> TESTANDO NA MÃO </script>' });
console.log(teste);
export default userSchema;
