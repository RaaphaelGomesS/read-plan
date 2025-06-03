import prisma from "../../prisma/prismaClient.js";
import { BookError } from "../errors/Errors.js";

class BookService {
  async getAllBooks(id) {
    const books = await prisma.book.findMany({
      where: { userId: id, finished: false },
    });

    if (books.length === 0) {
      return "Sua lista está vazia!";
    }

    return books;
  }

  async getAllFinishedBooks(id) {
    const books = await prisma.book.findMany({
      where: { userId: id, finished: true },
    });

    if (books.length === 0) {
      return "Nenhum livro foi finalizado!";
    }

    return books;
  }

  async insertBooks(id, data) {
    const booksToInsert = data.map((book) => ({
      title: book.title,
      author: book.authors.join(","),
      publisher: book.publisher,
      category: book.categories.join(","),
      pages: book.pages,
      img: book.image,
      userId: id,
    }));

    const howMany = await prisma.book.createMany({
      data: booksToInsert,
      skipDuplicates: true,
    });

    return howMany;
  }

  async finishBook(id) {
    await this.findById(id);
    console.log(id);

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
