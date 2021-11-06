const { Schema, model } = require("mongoose");

const Contact = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = model('contact', Contact);