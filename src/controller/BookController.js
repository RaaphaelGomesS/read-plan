import BookService from "../service/BookService.js";
import AuthService from "../service/AuthService.js";

class BookController {
  async registerUser(req, res, next) {
    try {
      const user = await BookService.createBook(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const id = req.userId;
      const user = await UserService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const tokenId = req.userId;
      const userId = parseInt(req.params.id);
      const { name, email, password } = req.body;

      AuthService.verifyHavePermission(tokenId, userId);

      const user = await UserService.updateUser(userId, name, email, password);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const tokenId = req.userId;
      const userId = parseInt(req.params.id);

      AuthService.verifyHavePermission(tokenId, userId);
      await UserService.deleteUser(userId);

      res
        .status(200)
        .json(`Mensagem: Usuário:${userId}, deletado com sucesso!`);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
