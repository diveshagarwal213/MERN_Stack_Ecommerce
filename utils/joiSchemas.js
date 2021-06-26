const Joi = require('joi');

const productJoi = Joi.object({
    name: Joi.string().max(20).required().lowercase(),
    price: Joi.number().required(),
    about: Joi.string().allow(null, ''),
    categories: Joi.array().items(Joi.string().lowercase().allow(null, '')),
    flavors: Joi.array().items(Joi.string().lowercase().allow(null, '')),
    image: Joi.string().required()
});

module.exports = { productJoi }