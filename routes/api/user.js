const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../../models/user");

// @route   POST api/user
// @desc    Sign up a new user
router.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length >= 1) {
        return res.status(409).json({
          message: "This email is already registered!"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              teams: req.body.teams
            });
            user
              .save()
              .then(() => {
                res.status(201).json({
                  message: "New user created!"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

// @route   POST api/user
// @desc    Sign in an existing user
router.post("/signin", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Incorrect Login Details!"
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, found) => {
        if (err) {
          return res.status(401).json({
            message: "Incorrect Login Details!"
          });
        }
        if (found) {
          return res.status(200).json({
            userId: users[0]._id,
            message: "Login successful!"
          });
        }
        res.status(401).json({
          message: "Incorrect Login Details!"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// @route   GET api/user/userId
// @desc    Get an existing user by user id
router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .exec()
    .then(foundUser => {
      res.status(200).json(foundUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// @route   PUT api/user
// @desc    Update an existing user
router.put("/", (req, res) => {
  User.findById(req.body._id)
    .exec()
    .then(foundUser => {
      foundUser.teams = req.body.teams;
      foundUser.save().then(() => {
        res.status(201).json({
          message: " User updated!"
        });
      })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;