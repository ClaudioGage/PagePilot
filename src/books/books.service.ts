import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { AuthorsRepository } from '../authors/authors.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository,
    private authorsRepository: AuthorsRepository,
  ) {}

  async create(createBookDto: CreateBookDto) {
    if (!(await this.authorsRepository.exists(createBookDto.authorId))) {
      throw new BadRequestException(`Author ${createBookDto.authorId} not found`);
    }
    return this.booksRepository.create({ ...createBookDto, isFavorite: false });
  }

  async findAll() {
    return this.booksRepository.findAll();
  }

  async findOne(id: string) {
    const book = await this.booksRepository.findById(id);
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    if (updateBookDto.authorId && !(await this.authorsRepository.exists(updateBookDto.authorId))) {
      throw new BadRequestException(`Author ${updateBookDto.authorId} not found`);
    }
    const book = await this.booksRepository.update(id, updateBookDto);
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  async remove(id: string) {
    const deleted = await this.booksRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Book ${id} not found`);
  }

  async findFavorites() {
    return this.booksRepository.findFavorites();
  }

  async toggleFavorite(id: string) {
    const book = await this.findOne(id);
    return this.update(id, { isFavorite: !book.isFavorite });
  }

  async findByAuthor(authorId: string) {
    return this.booksRepository.findByAuthorId(authorId);
  }
}