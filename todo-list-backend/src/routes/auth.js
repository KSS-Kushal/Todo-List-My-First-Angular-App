const express = require("express");
const Users = require("../models/Users");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fatchuser = require("../middleware/fatchuser");
const router = express.Router();

const JWT_SECRET = "kushalisagoodb$oy";

// Route 1 : Create a user using : POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 charaters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new user
      user = await Users.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      return res.status(200).json({ success: true, authToken });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error" });
    }
  }
);

// Route 2 : Login a user using : POST "/api/auth/login". Doesn't require Auth

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 charaters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Verify login details
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Credential" });
      }
      if (user) {
        const passverify = await bcrypt.compare(password, user.password);
        if (passverify) {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);

          return res.status(200).json({ success: true, authToken });
        } else {
          return res.status(400).json({ error: "Invalid Credential" });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Internal Server Error" });
    }
  }
);

// Route 3 : Get login user details using : GET "/api/auth/getuser". Require Login
router.get("/getuser", fatchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    if (user) {
      return res.status(200).json({ success: true, user });
    } else {
      return res.status(400).json({ success: false, msg: "User not exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
