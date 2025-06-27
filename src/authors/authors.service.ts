import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AuthorsRepository } from './authors.repository';
import { BooksRepository } from '../books/books.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto'
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorsRepository: AuthorsRepository,
    private readonly booksRepository: BooksRepository,
  ) {}

  create(createAuthorDto: CreateAuthorDto): Author {
    const author: Author = {
      id: uuidv4(),
      ...createAuthorDto,
    };
    return this.authorsRepository.create(author);
  }

  findAll(): Author[] {
    return this.authorsRepository.findAll();
  }

  findOne(id: string): Author {
    const author = this.authorsRepository.findById(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto): Author {
    const updatedAuthor = this.authorsRepository.update(id, updateAuthorDto);
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return updatedAuthor;
  }

  remove(id: string): void {
    const deleted = this.authorsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
  }

  findBooksByAuthor(id: string) {
    const author = this.findOne(id); 
    return this.booksRepository.findByAuthorId(id);
  }

  searchByName(name: string): Author | undefined {
    return this.authorsRepository.findByName(name);
  }

  findAuthorsByBirthYear(year: number): Author[] {
    return this.authorsRepository.findByBirthYear(year);
  }
}