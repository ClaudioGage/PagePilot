import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../src/books/books.controller';
import { BooksService } from '../src/books/books.service';
import { BooksRepository } from '../src/books/books.repository';
import { AuthorsRepository } from '../src/authors/authors.repository';
import { CreateBookDto } from '../src/books/dto/create-book.dto';
import { CreateAuthorDto } from '../src/authors/dto/create-author.dto';
import { AuthorsService } from '../src/authors/authors.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;
  let authorService: AuthorsService;
  let authorId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, BooksRepository, AuthorsService, AuthorsRepository],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
    authorService = module.get<AuthorsService>(AuthorsService);

    // Create an author for testing
    const createAuthorDto: CreateAuthorDto = {
      name: 'J.K. Rowling',
      bio: 'British author',
      birthYear: 1965,
    };
    const author = authorService.create(createAuthorDto);
    authorId = author.id;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', () => {
      const createBookDto: CreateBookDto = {
        title: 'Harry Potter',
        summary: 'A wizard story',
        publicationYear: 1997,
        authorId: authorId,
      };

      const result = controller.create(createBookDto);

      expect(result).toBeDefined();
      expect(result.title).toBe(createBookDto.title);
      expect(result.summary).toBe(createBookDto.summary);
      expect(result.publicationYear).toBe(createBookDto.publicationYear);
      expect(result.authorId).toBe(createBookDto.authorId);
      expect(result.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of books', () => {
      const createBookDto: CreateBookDto = {
        title: 'Harry Potter',
        summary: 'A wizard story',
        publicationYear: 1997,
        authorId: authorId,
      };

      service.create(createBookDto);
      const result = controller.findAll();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].title).toBe(createBookDto.title);
    });
  });
});