import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BooksService } from '../src/books/books.service';
import { BooksRepository } from '../src/books/books.repository';
import { AuthorsRepository } from '../src/authors/authors.repository';

describe('BooksService', () => {
  let service: BooksService;
  let booksRepository: BooksRepository;
  let authorsRepository: AuthorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BooksRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findFavorites: jest.fn(),
            findByAuthorId: jest.fn(),
          },
        },
        {
          provide: AuthorsRepository,
          useValue: {
            exists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    booksRepository = module.get<BooksRepository>(BooksRepository);
    authorsRepository = module.get<AuthorsRepository>(AuthorsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book when author exists', async () => {
      const createDto = {
        title: 'Harry Potter',
        summary: 'A wizard story',
        publicationYear: 1997,
        authorId: 'author-1',
      };
      const mockBook = { id: '1', ...createDto, isFavorite: false };

      jest.spyOn(authorsRepository, 'exists').mockResolvedValue(true);
      jest.spyOn(booksRepository, 'create').mockResolvedValue(mockBook);

      const result = await service.create(createDto);

      expect(result).toEqual(mockBook);
      expect(authorsRepository.exists).toHaveBeenCalledWith('author-1');
      expect(booksRepository.create).toHaveBeenCalledWith({ ...createDto, isFavorite: false });
    });

    it('should throw BadRequestException when author does not exist', async () => {
      const createDto = {
        title: 'Harry Potter',
        summary: 'A wizard story',
        publicationYear: 1997,
        authorId: 'non-existent-author',
      };

      jest.spyOn(authorsRepository, 'exists').mockResolvedValue(false);

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle book favorite status', async () => {
      const mockBook = { id: '1', title: 'Test Book', isFavorite: false };
      const updatedBook = { ...mockBook, isFavorite: true };

      jest.spyOn(booksRepository, 'findById').mockResolvedValue(mockBook);
      jest.spyOn(booksRepository, 'update').mockResolvedValue(updatedBook);

      const result = await service.toggleFavorite('1');

      expect(result).toEqual(updatedBook);
      expect(booksRepository.update).toHaveBeenCalledWith('1', { isFavorite: true });
    });
  });
});