const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fullName is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    trim: true,
    unique: [true, "email already registerd enter a new email"],
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: "enter avalid email",
    },
  },
  role: {
    type: String,
    required: [true, "role is required"],
    enum: ["normal", "admin"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  number: {
    type: Number,
    required: [true, "number is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("USER", userSchema);
