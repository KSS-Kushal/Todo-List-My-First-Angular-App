const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/todo_list?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connect successfully");
    })
    .catch((error) => {
      console.log("Error to connect databbase", error);
    });
};

module.exports = connectToMongo;
