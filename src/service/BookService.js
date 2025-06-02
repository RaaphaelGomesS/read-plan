import prisma from "../../prisma/prismaClient.js";
import Validation from "../utils/Validation.js";
import { BookError } from "../errors/Error.js";

class BookService {
  async getAllBooks() {}

  async getAllFinishedBooks() {}

  async createBook(data) {
    const book = await prisma.book.create({
      data: {},
    });

    return book;
  }

  async updateBook(id, data) {
    await this.findById(id);

    const book = await prisma.book.update({
      where: { id },
      data: {},
    });

    return book;
  }

  async finishBook(id, data) {
    await this.findById(id);

    const book = await prisma.book.update({
      where: { id },
      data: {},
    });

    return book;
  }

  async deleteBook(id) {
    await this.findById(id);

    await prisma.book.delete({
      where: { id },
    });
  }

  async findById(id) {
    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new BookError("Livro não encontrado!", 404);
    }
    return book;
  }
}

export default new BookService();
