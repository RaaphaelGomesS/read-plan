import UserService from "../service/UserService.js";

class UserController {
  async getUser(req, res, next) {
    try {
      const user = await UserService.findUserById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser(name, email, password);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {

  }

  async login(req, res, next) {

  }
}
