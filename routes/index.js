const express = require("express");
const indexRouter = express.Router();
const fs = require("fs").promises;
const path = require("path");

indexRouter.get("/", function (req, res, next) {
  res.render("index");
});

indexRouter.get("/register", function (req, res, next) {
  res.render("register");
});

indexRouter.get("/login", function (req, res, next) {
  res.render("login");
});

indexRouter.get("/todo", async (req, res, next) => {
  const users = await req.app.locals.services.users.getUsers();
  const loggedInUser = users[0].currentUser;

  if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
    return res.status(401).json({
      message: "User must be logged in",
    });
  }

  res.render("todo", {
    todos: loggedInUser.todos,
  });
});

module.exports = indexRouter;
