const { schema } = require("../schema/schema");
class UsersController {
  async getUsers(req, res, next) {
    const users = await req.app.locals.services.users.getUsers();
    return res.json(users);
  }
}

module.exports.UsersController = UsersController;
