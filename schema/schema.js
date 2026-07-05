const joi = require("joi");

const schema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
})

module.exports.schema = schema