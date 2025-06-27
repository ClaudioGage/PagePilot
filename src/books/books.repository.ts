import { Injectable } from '@nestjs/common';
import { IRepository } from '../common/interfaces/repository.interface';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksRepository implements IRepository<Book> {
  private books: Book[] = [];

  create(book: Book): Book {
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findById(id: string): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  update(id: string, updateData: Partial<Book>): Book | undefined {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return undefined;
    
    this.books[index] = { ...this.books[index], ...updateData };
    return this.books[index];
  }

  delete(id: string): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return false;
    
    this.books.splice(index, 1);
    return true;
  }

  // Additional methods specific to books
  findByAuthorId(authorId: string): Book[] {
    return this.books.filter(book => book.authorId === authorId);
  }

  findFavorites(): Book[] {
    return this.findAll().filter(book => book.isFavorite);
  }

  findByTitle(title: string): Book[] {
    return this.findAll().filter(book => 
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  findByPublicationYear(year: number): Book[] {
    return this.findAll().filter(book => book.publicationYear === year);
  }

  findByYearRange(startYear: number, endYear: number): Book[] {
    return this.findAll().filter(book => 
      book.publicationYear >= startYear && book.publicationYear <= endYear
    );
  }

  countByAuthor(authorId: string): number {
    return this.findByAuthorId(authorId).length;
  }

  exists(id: string): boolean {
    return this.findById(id) !== undefined;
  }
}