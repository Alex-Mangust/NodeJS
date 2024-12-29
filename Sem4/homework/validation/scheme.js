const joi = require("joi");

const usersSchema = joi.object({
    name: joi.string().min(1).max(100).required(),
    surname: joi.string().min(1).max(100).required(),
    city: joi.string().min(1).max(100).required(),
    age: joi.number().min(14).max(120)
});

const usersIdSchema = joi.object({
    id: joi.number().min(1).required()
});

module.exports = { usersSchema, usersIdSchema }