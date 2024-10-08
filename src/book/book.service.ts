import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entity/Book.entity';

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService<Book>;

  /**
   * 删除图书
   * @param id
   * @returns
   */
  async delete(id: string) {
    const books = await this.dbService.read();
    const targetBookIndex = books.findIndex(
      (book) => book.id.toString() === id,
    );
    if (targetBookIndex === -1) throw new BadRequestException('该图书不存在');

    books.splice(targetBookIndex, 1);
    await this.dbService.write(
      books.filter((book) => book.id.toString() !== id),
    );

    return '删除成功';
  }

  /**
   * 更新图书
   * @param updateBookDto
   * @returns
   */
  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const targetBook = books.find((book) => book.id === updateBookDto.id);

    targetBook.author = updateBookDto.author;
    targetBook.cover = updateBookDto.cover;
    targetBook.description = updateBookDto.description;
    targetBook.name = updateBookDto.name;

    await this.dbService.write(books);

    return targetBook;
  }

  /**
   * 新建图书
   * @param createBookDto
   * @returns
   */
  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    const book = new Book(
      Math.floor(Math.random() * 1000000),
      createBookDto.name,
      createBookDto.author,
      createBookDto.description,
      createBookDto.cover,
    );

    books.push(book);

    await this.dbService.write(books);

    return book;
  }

  /**
   * 通过ID查找
   * @param id
   */
  async findById(id: string) {
    const books = await this.dbService.read();
    const targetBook = books.find((book) => book.id.toString() === id);
    return targetBook ? targetBook : new BadRequestException('该图书不存在');
  }

  /**
   * 查询全部
   */
  async list() {
    return await this.dbService.read();
  }
}
