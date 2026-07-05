class TodoController {
  async addTodo(req, res) {
    try {
      await req.app.locals.services.todos.addTodo(req.body);
      res.redirect("/todo");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async deleteTodo(req, res) {
    try {
      await req.app.locals.services.todos.deleteTodo(req.params.id);
      res.redirect("/todo");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async doneTodo(req, res) {
    try {
      await req.app.locals.services.todos.doneTodo(req.params.id);
      res.redirect("/todo");
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  async editTodo(req, res) {
    try {
      await req.app.locals.services.todos.editTodo(req.params.id);

      res.redirect("/todo");
    } catch (err) {
      res.json({ message: err.message });
    }
  }
  async saveTodo(req, res) {
    try {
      await req.app.locals.services.todos.saveTodo(req.params.id, req.body);
      res.redirect("/todo");
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports.TodoController = TodoController;
