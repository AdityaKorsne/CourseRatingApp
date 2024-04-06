const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const USER = require("../model/userModel");

const app = express();
app.use(router);

router.post("/register", (req, res) => {
  if (!req.body.password) {
    res.status(400).json({ Message: "Password is required" });
  } else {
    let newUser = new USER({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
      number: req.body.number,
    });
    newUser
      .save()
      .then((data) => {
        res.status(200).json({ Message: "Data added successfully" });
      })
      .catch((err) => {
        res.status(500).json({ Message: "Failed", error: err });
      });
  }
});

module.exports = router;
