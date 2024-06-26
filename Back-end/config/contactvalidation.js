const Joi = require('joi');

const Contactvalidation = Joi.object({
    salutation: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required()
});

module.exports = Contactvalidation;