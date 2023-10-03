const mongoose = require("mongoose");

const connectDatabase = (URl) => {
  return mongoose
    .connect(URl)
    .then(() => {
      console.log("connected to database successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
