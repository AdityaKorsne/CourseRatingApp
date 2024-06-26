const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const USER = require("../model/userModel");
const jwt = require("jsonwebtoken");

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

router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({
      Status: "Login failed",
      Message: "both email and password required",
    });
  USER.findOne({ email: req.body.email })
    .then((data) => {
      const verifyPassword = bcrypt.compareSync(
        req.body.password,
        data.password
      );
      if (!verifyPassword) {
        return res
          .status(401)
          .json({ Status: "failed", Message: "Invalid password" });
      }
      const token = jwt.sign(
        { id: data.id, role: data.role },
        process.env.SECRET,
        {
          expiresIn: 84600,
        }
      );
      res.status(200).json({
        Status: "Log in successful",
        userInfo: {
          name: data.fullName,
          email: data.email,
          role: data.role,
        },
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(400).json({ Message: "email not registered" });
    });
});

router.get("/usersDetails", (req, res) => {
  USER.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req, res) => {
  USER.findById(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

router.patch("/:id", (req, res) => {
  USER.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

router.delete("/:id", (req, res) => {
  USER.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.status(200).json({ Message: "user deleted successfully" })
    )
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
