const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");
const { ReadDBService } = require("./readDBService");
const { schema } = require("../schema/schema");

class AuthServices extends ReadDBService {
  async registerUser(body) {
    const users = await super.getUsers();
    const newUser = await schema.validateAsync(body);
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.id = Date.now();
    newUser.todos = [];
    newUser.password = hashedPassword;

    const isDuplicated = users[0].allUsers.find(
      (user) => user.email === newUser.email,
    );

    if (!isDuplicated) {
      users[0].allUsers.push(newUser);
      const dbPath = path.join(__dirname, "..", "db", "users.json");
      await fs.writeFile(dbPath, JSON.stringify(users, null, 2), "utf-8");
    }
  }
  async loginUser(body) {
    const users = await super.getUsers();

    const availableUser = users[0].allUsers.find(
      (user) => user.email === body.email,
    );

    if (!availableUser) {
      throw new Error("Invalid email or password");
    }

    const isMatchedPasswords = await bcrypt.compare(
      body.password,
      availableUser.password,
    );

    if (!isMatchedPasswords) {
      throw new Error("Invalid email or password");
    }

    users[0].currentUser = availableUser;

    const dbPath = path.join(__dirname, "..", "db", "users.json");
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2), "utf-8");

    return availableUser;
  }
  async logoutUser() {
    const users = await super.getUsers();
    const allUsers = users[0].allUsers;
    const loggedOutUser = {};
    const updatedUsersDb = [
      {
        allUsers,
        currentUser: loggedOutUser,
      },
    ];
    const dbPath = path.join(__dirname, "..", "db", "users.json");
    await fs.writeFile(
      dbPath,
      JSON.stringify(updatedUsersDb, null, 2),
      "utf-8",
    );
  }
}

module.exports.AuthServices = AuthServices;
