// userValidation.js
import Joi from "joi";

// Define the validation schema
const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of string",
    "string.empty": "Name cannot be an empty field",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of string",
    "string.empty": "Email cannot be an empty field",
    "string.email": "Email must be a valid email",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a type of string",
    "string.empty": "Password cannot be an empty field",
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is a required field",
  }),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]*$/)
    .required()
    .messages({
      "string.base": "Phone should be a type of string",
      "string.empty": "Phone cannot be an empty field",
      "string.length": "Phone number must be 11 digits",
      "string.pattern.base": "Phone number must contain only numbers",
      "any.required": "Phone is a required field",
    }),
  role: Joi.string()
    .valid("superadmin", "admin", "salesman")
    .required()
    .messages({
      "string.base": "Role should be a type of string",
      "string.empty": "Role cannot be an empty field",
      "any.only": "Role must be one of [superadmin, admin, salesman]",
      "any.required": "Role is a required field",
    }),
});

// Export the validation schema
export default userValidationSchema;
