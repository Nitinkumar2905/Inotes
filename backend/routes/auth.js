const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// Create a user using : Post "/api/auth/createuser" , No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Minimum length is 8").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // If there are error , return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user exists with the same email or not:
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User already exists with this email." });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.send(user);
      console.log(`response confirmed with status code ${400}`);
    } catch (error) {
      console.log(error);
      res.json({ error: "Please enter unique email", message: error.message });
    }
  }
);

module.exports = router;
