import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from '../src/authors/authors.controller';
import { AuthorsService } from '../src/authors/authors.service';
import { AuthorsRepository } from '../src/authors/authors.repository';
import { BooksRepository } from '../src/books/books.repository';
import { CreateAuthorDto } from '../src/authors/dto/create-author.dto';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [AuthorsService, AuthorsRepository, BooksRepository],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'J.K. Rowling',
        bio: 'British author',
        birthYear: 1965,
      };

      const result = controller.create(createAuthorDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(createAuthorDto.name);
      expect(result.bio).toBe(createAuthorDto.bio);
      expect(result.birthYear).toBe(createAuthorDto.birthYear);
      expect(result.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'J.K. Rowling',
        bio: 'British author',
        birthYear: 1965,
      };

      service.create(createAuthorDto);
      const result = controller.findAll();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe(createAuthorDto.name);
    });
  });
});