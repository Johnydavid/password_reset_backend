const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require('joi-password-complexity');

// Derive a Schema

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY, {expiresIn:"7d"});
    return token;
}

const User = mongoose.model("user", userSchema);

const validate = (data)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required()
    });
    return schema.validate(data);
}

module.exports = {User, validate};