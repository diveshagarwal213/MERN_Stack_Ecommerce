const Joi = require('joi');

const productJoi = Joi.object({
    name: Joi.string().max(20).required(),
    price: Joi.number().required(),
    about: Joi.string(),
    categories: Joi.array().items(Joi.string().lowercase()),
    image: Joi.string().required()
});

module.exports = { productJoi }