const express = require("express");
const { TodoController } = require("../controllers/todoController");
const todoRouter = express.Router();

const todoController = new TodoController();

todoRouter.post("/create", todoController.addTodo);
todoRouter.post("/delete/:id", todoController.deleteTodo);
todoRouter.post("/done/:id", todoController.doneTodo)
todoRouter.post("/edit/:id", todoController.editTodo)
todoRouter.post("/save/:id", todoController.saveTodo)

module.exports = todoRouter;
