const Joi = require('joi');

const productJoi = Joi.object({
    name: Joi.string().max(20).required().lowercase(),
    price: Joi.number().required(),
    about: Joi.string().allow(null, ''),
    categories: Joi.array().items(Joi.string().lowercase().allow(null, '')),
    flavors: Joi.array().items(Joi.string().lowercase().allow(null, '')),
    image: Joi.string().required()
});

const userJoiSchema = Joi.object({
    username: Joi.string().max(20).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
});

const AddressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().uppercase().required(),
    zip: Joi.number().min(4).required(),
    mobNumber: Joi.number().min(10).required()

})

module.exports = { productJoi, userJoiSchema, loginSchema, AddressSchema }
