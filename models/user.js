const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "first name must be provided"],
    match: [/^[a-zA-Z0-9]+$/, "name is invalid"],
  },
  lastName: {
    type: String,
    required: [true, "last name must be provided"],
    match: [/^[a-zA-Z0-9]+$/, "name is invalid"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email must be provided"],
    match: [/\S+@\S+\.\S+/, "email is invalid"],
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
    minLength: [4, "password can't be less tan 4 characters"],
  },
  token: { type: String },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
