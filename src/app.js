const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
const contacts = require("./routes/contacts");
const mongo_url = 'mongodb+srv://Vlad:react-advanced-1@cluster0.kmegh.mongodb.net/node-homework-3?retryWrites=true&w=majority';
mongoose
  .connect(mongo_url)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });



app.use('/api/contacts', contacts);

module.exports = app;