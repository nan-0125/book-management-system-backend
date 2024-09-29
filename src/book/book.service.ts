import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entity/Book.entity';

@Injectable()
export class BookService {
    @Inject()
    dbService: DbService
    delete(id: string) {
        this.dbService.read()
        throw new Error('Method not implemented.');
    }
    async update(updateBookDto: UpdateBookDto) {
        const books: Book[] = await this.dbService.read();
        const targetBook = books.find(book => book.id === updateBookDto.id);

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

        const book = new Book(Math.random(), createBookDto.name, createBookDto.author, createBookDto.description, createBookDto.cover);

        books.push(book);

        await this.dbService.write(books);

        return book;
    }
    findById(id: string) {
        throw new Error('Method not implemented.');
    }
    list() {

        throw new Error('Method not implemented.');
    }
}
