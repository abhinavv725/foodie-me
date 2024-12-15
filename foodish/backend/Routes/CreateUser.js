const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Route

router.post(
  "/createUser",
  body("name", "Invalid Username").isLength({ min: 3 }),
  body("email", "Invalid Email ID").isEmail(),
  body("password", "Invalid Password").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
          message: errors.msg,
        });
      }
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Sorry, User with same email already exits",
        });
      }
      const salt = await bcrypt.genSalt(10);
      let securePassword = await bcrypt.hash(req.body.password, salt);
      try {
        const user = await User.create({
          name: req.body.name,
          location: req.body.location,
          email: req.body.email,
          password: securePassword,
        }).then((user) => {
          // Create token
          // This logic is reluctant currently
          const email = req.body.email;
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
          console.log(token);
          res.json({ success: true, User_created: user });
        });
      } catch (err) {
        console.log("error in creating user ", err);
      }
    } catch (error) {
      console.log("error ", error);
      res.json({ success: false });
    }
  }
);

// Login Route

router.post(
  "/loginUser",
  body("email", "Invalid Email ID").isEmail(),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ success: false, errors: "Incorrect Credentials" });
      }
      if (userData && (await bcrypt.compare(password, userData.password))) {
        const token = jwt.sign(
          { user_id: userData._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // user
        res
          .status(200)
          .json({ success: true, user: userData, authToken: token });
      }
      // res.status(400).send("Invalid Credentials");
    } catch (error) {
      console.log("error ", error);
    }
  }
);

module.exports = router;
