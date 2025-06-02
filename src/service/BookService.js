import prisma from "../../prisma/prismaClient.js";
import { BookError } from "../errors/Error.js";

class BookService {
  async getAllBooks(id) {
    const books = prisma.book.findMany({
      where: { id, finished: false },
    });

    return books;
  }

  async getAllFinishedBooks(id) {
    const books = prisma.book.findMany({
      where: { id, finished: true },
    });

    return books;
  }

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

  async finishBook(id) {
    await this.findById(id);

    const book = await prisma.book.update({
      where: { id },
      data: { finished: true },
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
