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

  async insertBooks(id, data) {

    const booksToInsert = data.map(book => ({
        title: book.title,
        author: book.authors.join(","),
        publisher: book.publisher,
        categoty: book.categories.join(","),
        pages: book.pages,
        img: book.image,
        userId: id,
    }));

    const howMany = await prisma.book.create({
      data: {booksToInsert},
    });

    return howMany;
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
