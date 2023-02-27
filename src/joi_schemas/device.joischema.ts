import * as Joi from 'joi';

const joiCreateDeviceSchema = Joi.object({
  name: Joi.string().required(),
  temperature: Joi.string()
    .required()
    .regex(/^-?\d+(\.\d+)?°C$/)
    .messages({
      'string.pattern.base': 'temperature must be a number followed by °C',
    }),
  luminosity: Joi.string()
    .required()
    .regex(/^\d+(\.\d+)?(lx|lux|lm)$/)
    .messages({
      'string.pattern.base':
        'luminosity must be a number followed by lx, lux or lm',
    }),
  humidity: Joi.string()
    .required()
    .regex(/^\d+(\.\d+)?%$/)
    .messages({
      'string.pattern.base': 'humidity must be a number followed by %',
    }),
});

const joiUpdateDeviceSchema = Joi.object({
  name: Joi.string(),
  temperature: Joi.string()
    .regex(/^-?\d+(\.\d+)?°C$/)
    .messages({
      'string.pattern.base': 'temperature must be a number followed by °C',
    }),
  luminosity: Joi.string()
    .regex(/^\d+(\.\d+)?(lx|lux|lm)$/)
    .messages({
      'string.pattern.base':
        'luminosity must be a number followed by lx, lux or lm',
    }),
  humidity: Joi.string()
    .regex(/^\d+(\.\d+)?%$/)
    .messages({
      'string.pattern.base': 'humidity must be a number followed by %',
    }),
});

export {
  joiCreateDeviceSchema,
  joiUpdateDeviceSchema,
};
