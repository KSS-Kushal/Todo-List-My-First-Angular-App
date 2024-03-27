const express = require("express");
const fatchuser = require("../middleware/fatchuser");
const Todos = require("../models/Todos");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Route 1 : Get login user todos using : GET "/api/todos/gettodos". Require Login

router.get("/gettodos", fatchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todos.find({ user: userId });
    if (todos) {
      return res.status(200).json({ success: true, todos });
    } else {
      return res.status(400).json({ success: false, msg: "User not exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
});

// Route 2 : Create user todos using : POST "/api/todos/createtodos". Require Login

router.post(
  "/createtodos",
  fatchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description } = req.body;
      const userId = req.user.id;
      const todo = await Todos.create({
        user: userId,
        title: title,
        description: description,
      });
      return res.status(200).json({ success: true, todo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error" });
    }
  }
);

// Route 3 : Update user todos as done using : PUT "/api/todos/updatetodos". Require Login

router.put("/updatetodos/:id", fatchuser, async (req, res) => {
  try {
    const { active } = req.body;

    //Find the todo to be update and update it
    let todo = await Todos.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not Found");
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: "Not Allowed" });
    }

    todo = await Todos.findByIdAndUpdate(
      req.params.id,
      { $set: { active: active } },
      { new: true }
    );
    return res.status(200).json({ success: true, todo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
});

// Route 4 : Delete user todos using : DELETE "/api/todos/deletetodo". Require Login

router.delete("/deletetodo/:id", fatchuser, async (req, res) => {
  try {
    //Delete the note to be delete and delete it
    let todo = await Todos.findById(req.params.id);

    if (!todo) {
      return res.status(404).send({ success: false, msg: "Note Found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(404).send({ success: false, msg: "Note Found" });
    }
    todo = await Todos.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, todo, msg: "Successfully Deleted" });
  } catch (error) {
    console.log(error.massage);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
