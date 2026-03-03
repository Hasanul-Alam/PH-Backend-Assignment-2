import Joi from "joi";

export const orderValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // allow any domain
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),

  productId: Joi.string()
    .length(24) // MongoDB ObjectId is 24 hex characters
    .hex()
    .required()
    .messages({
      "string.length": "Product ID must be a valid 24-character ObjectId",
      "any.required": "Product ID is required",
    }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});
