const Joi = require("joi");

const expenseValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  amount: Joi.number().positive().required(),
  category: Joi.string()
    .valid(
      "Food",
      "Transport",
      "Shopping",
      "Entertainment",
      "Health",
      "Education",
      "Bills",
      "Others"
    )
    .required(),
  date: Joi.date().required(),
});

const userValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  expenseValidation,
  userValidation,
  loginValidation,
};
