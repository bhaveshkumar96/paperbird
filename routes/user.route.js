const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router()
userRouter.get("/", async (req, res) => {
  try {
    res.send("this is users home page");
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        let user = new UserModel({ name, email, password: hash });
        await user.save();
        res.status(200).send(user);
      }
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let existingUser = await UserModel.find({ email });
    if (existingUser.length > 0) {
      bcrypt.compare(password, existingUser[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: existingUser[0]._id }, "papertech");
          res.send({ token: token });
        } else {
          res.send("wrong credential");
        }
      });
    }
  } catch (error) {
    res.send("wrong credential");
  }
});


module.exports = {
    userRouter
}