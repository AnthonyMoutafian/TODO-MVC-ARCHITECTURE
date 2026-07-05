const { schema } = require("../schema/schema");
class AuthController {
  async registerUser(req, res, next) {
    try {
      const newUser = req.body;
      const auth = await req.app.locals.services.auth.registerUser(newUser);
      res.redirect("/login");
    } catch (err) {
      res.json({ message: err.message });
    }
  }
  async loginUser(req, res, next) {
    try {
      const user = req.body;
      const auth = await req.app.locals.services.auth.loginUser(user);
      res.redirect("/todo");
    } catch (err) {
      res.json({ message: err.message });
    }
  }
  async logoutUser(req, res, next) {
    try {
      const auth = await req.app.locals.services.auth.logoutUser();
      res.redirect("/login");
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports.AuthController = AuthController;
