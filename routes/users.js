const express = require("express");
const { UsersController } = require("../controllers/usersController");
const usersRouter = express.Router();

const usersController = new UsersController()

usersRouter.get("/users", usersController.getUsers);

module.exports = usersRouter;
