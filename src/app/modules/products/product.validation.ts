import Joi from "joi";

const variantValidationSchema = Joi.object({
  type: Joi.string().trim().required().messages({
    "string.base": "Variant type must be a string",
    "any.required": "Variant type is required",
  }),

  value: Joi.string().trim().required().messages({
    "string.base": "Variant value must be a string",
    "any.required": "Variant value is required",
  }),
});

const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().integer().min(0).default(0).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be a whole number",
    "number.min": "Quantity cannot be negative",
    "any.required": "Quantity is required",
  }),

  inStock: Joi.boolean().default(true).messages({
    "boolean.base": "inStock must be a boolean",
  }),
});

export const productValidationSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    "string.base": "Product name must be a string",
    "string.max": "Product name cannot exceed 100 characters",
    "any.required": "Product name is required",
  }),

  description: Joi.string().trim().max(1000).required().messages({
    "string.base": "Description must be a string",
    "string.max": "Description cannot exceed 1000 characters",
    "any.required": "Description is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  category: Joi.string().trim().required().messages({
    "string.base": "Category must be a string",
    "any.required": "Category is required",
  }),

  tags: Joi.array().items(Joi.string()).default([]).messages({
    "array.base": "Tags must be an array of strings",
  }),

  variants: Joi.array().items(variantValidationSchema).default([]).messages({
    "array.base": "Variants must be an array",
  }),

  inventory: inventoryValidationSchema.required().messages({
    "any.required": "Inventory details are required",
  }),
});
