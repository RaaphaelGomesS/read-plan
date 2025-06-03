import prisma from "../../prisma/prismaClient.js";
import { BookError } from "../errors/Errors.js";

class BookService {
  async getAllBooks(id) {
    const books = await prisma.book.findMany({
      where: { user_id: id, finished: false },
    });

    if (books.length === 0) {
      return [];
    }

    return books;
  }

  async getAllFinishedBooks(id) {
    const books = await prisma.book.findMany({
      where: { user_id: id, finished: true },
    });

    if (books.length === 0) {
      return [];
    }

    return books;
  }

  async insertBooks(id, data) {
    const booksToInsert = data.books.map((book) => ({
      title: book.title,
      author: book.authors,
      category: book.categories,
      pages: book.pages,
      img: book.image,
      user_id: id,
    }));

   await prisma.book.createMany({
      data: booksToInsert,
      skipDuplicates: true,
    });
  }

  async finishBook(id) {
    await this.findById(id);

    await prisma.book.update({
      where: { id },
      data: { finished: true },
    });
  }

  async unfinishBook(id) {
    await this.findById(id);

    await prisma.book.update({
      where: { id },
      data: { finished: false },
    });
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
