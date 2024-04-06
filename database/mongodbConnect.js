const mongoose = require("mongoose");

function mongodbConnection() {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to the DB.");
  } catch (err) {
    console.log("Connection to the DB failed.");
  }
}

module.exports = { mongodbConnection };
