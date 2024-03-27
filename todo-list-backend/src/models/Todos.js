const mongoose = require("mongoose");
const { Schema } = mongoose;

const todosSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    req: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const todos = mongoose.model("todos", todosSchema);

module.exports = todos;
