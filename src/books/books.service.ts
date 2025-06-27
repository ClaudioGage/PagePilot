import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BooksRepository } from './books.repository';
import { AuthorsRepository } from '../authors/authors.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsRepository: AuthorsRepository,
  ) {}

  create(createBookDto: CreateBookDto): Book {
    // Verify author exists using repository
    if (!this.authorsRepository.exists(createBookDto.authorId)) {
      throw new BadRequestException(`Author with ID ${createBookDto.authorId} not found`);
    }

    const book: Book = {
      id: uuidv4(),
      isFavorite: false,
      ...createBookDto,
    };
    return this.booksRepository.create(book);
  }

  findAll(): Book[] {
    return this.booksRepository.findAll();
  }

  findOne(id: string): Book {
    const book = this.booksRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto): Book {
    // If authorId is being updated, verify the new author exists
    if (updateBookDto.authorId && !this.authorsRepository.exists(updateBookDto.authorId)) {
      throw new BadRequestException(`Author with ID ${updateBookDto.authorId} not found`);
    }

    const updatedBook = this.booksRepository.update(id, updateBookDto);
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  remove(id: string): void {
    const deleted = this.booksRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  findFavorites(): Book[] {
    return this.booksRepository.findFavorites();
  }

  // Additional business logic methods
  searchByTitle(title: string): Book[] {
    return this.booksRepository.findByTitle(title);
  }

  findByPublicationYear(year: number): Book[] {
    return this.booksRepository.findByPublicationYear(year);
  }

  findByYearRange(startYear: number, endYear: number): Book[] {
    return this.booksRepository.findByYearRange(startYear, endYear);
  }

  toggleFavorite(id: string): Book {
    const book = this.findOne(id);
    return this.update(id, { isFavorite: !book.isFavorite });
  }

  getAuthorBookCount(authorId: string): number {
    if (!this.authorsRepository.exists(authorId)) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }
    return this.booksRepository.countByAuthor(authorId);
  }
}