const fs = require("fs").promises;
const path = require("path");
const { ReadDBService } = require("./readDBService");

class TodoService extends ReadDBService {
  async save(data) {
    const dbPath = path.join(__dirname, "..", "db", "users.json");
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
  }
  async addTodo(body) {
    const users = await super.getUsers();
    const currentUser = users[0].currentUser;

    const index = users[0].allUsers.findIndex(
      (user) => user.id === currentUser.id,
    );

    if (body.todo.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        todo: body.todo,
        isChecked: false,
        isEditing: false,
      };

      users[0].allUsers[index].todos.push(newTodo);
      currentUser.todos.push(newTodo);

      const newData = [
        {
          allUsers: users[0].allUsers,
          currentUser: currentUser,
        },
      ];

      await this.save(newData);
    }
  }
  async deleteTodo(id) {
    const users = await super.getUsers();
    const currentUser = users[0].currentUser;

    const index = users[0].allUsers.findIndex(
      (user) => user.id === currentUser.id,
    );

    users[0].allUsers[index].todos = users[0].allUsers[index].todos.filter(
      (todo) => todo.id !== Number(id),
    );

    currentUser.todos = currentUser.todos.filter(
      (todo) => todo.id !== Number(id),
    );

    await this.save(users);
  }

  async doneTodo(id) {
    const todoId = Number(id);
    const users = await super.getUsers();
    const data = users[0];

    const currentUser = data.currentUser;

    const updatedAllUsers = data.allUsers.map((user) => {
      if (user.id !== currentUser.id) return user;

      return {
        ...user,
        todos: user.todos.map((todo) =>
          todo.id === todoId ? { ...todo, isChecked: true } : todo,
        ),
      };
    });

    const updatedCurrentUser = {
      ...currentUser,
      todos: currentUser.todos.map((todo) =>
        todo.id === todoId ? { ...todo, isChecked: true } : todo,
      ),
    };

    const newData = [
      {
        allUsers: updatedAllUsers,
        currentUser: updatedCurrentUser,
      },
    ];

    await this.save(newData);
  }
  async editTodo(id) {
    const users = await super.getUsers();
    const data = users[0];

    const todoId = Number(id);

    const updatedAllUsers = data.allUsers.map((user) => {
      if (user.id !== data.currentUser.id) return user;

      return {
        ...user,
        todos: user.todos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                isEditing: true,
              }
            : todo,
        ),
      };
    });

    const updatedCurrentUser = {
      ...data.currentUser,
      todos: data.currentUser.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              isEditing: true,
            }
          : todo,
      ),
    };

    const newData = [
      {
        allUsers: updatedAllUsers,
        currentUser: updatedCurrentUser,
      },
    ];

    await this.save(newData);
  }
  async saveTodo(id, body) {
    const users = await super.getUsers();
    const data = users[0];

    const todoId = Number(id);

    const updatedAllUsers = data.allUsers.map((user) => {
      if (user.id !== data.currentUser.id) return user;

      return {
        ...user,
        todos: user.todos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                todo: body.todo,
                isEditing: false,
              }
            : todo,
        ),
      };
    });

    const updatedCurrentUser = {
      ...data.currentUser,
      todos: data.currentUser.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              todo: body.todo,
              isEditing: false,
            }
          : todo,
      ),
    };

    const newData = [
      {
        allUsers: updatedAllUsers,
        currentUser: updatedCurrentUser,
      },
    ];

    await this.save(newData);
  }
}

module.exports.TodoService = TodoService;
