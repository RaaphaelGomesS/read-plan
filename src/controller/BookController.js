import BookService from "../service/BookService.js";
import AuthService from "../service/AuthService.js";

class BookController {
  async getListOfBooks(req, res, next) {
    try {
      const id = req.userId;
      const books = await BookService.getAllBooks(id);
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async getListOfFinishedBooks(req, res, next) {
    try {
      const id = req.userId;
      const books = await BookService.getAllFinishedBooks(id);
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async insertBooks(req, res, next) {
    try {
      const id = req.userId;
      const howMany = await BookService.insertBooks(id, req.body);
      res.status(201).json(howMany);
    } catch (error) {
      next(error);
    }
  }

  async finishBook(req, res, next) {
    try {
      const tokenId = req.userId;
      const bookId = parseInt(req.params.id);

      AuthService.verifyHaveBookPermission(tokenId, bookId);
      await BookService.finishBook(bookId);
      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const tokenId = req.userId;
      const bookId = parseInt(req.params.id);

      AuthService.verifyHaveBookPermission(tokenId, bookId);
      await BookService.deleteBook(bookId);

      res.status(200).json(`Mensagem: livro:${bookId}, deletado com sucesso!`);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
