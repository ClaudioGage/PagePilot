import { Test, TestingModule } from '@nestjs/testing';
import { BooksRepository } from '../src/books/books.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksRepository', () => {
  let repository: BooksRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksRepository,
        {
          provide: PrismaService,
          useValue: {
            book: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<BooksRepository>(BooksRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const bookData = {
        title: 'Harry Potter',
        summary: 'A wizard story',
        publicationYear: 1997,
        authorId: 'author-1',
        isFavorite: false,
      };
      const mockBook = { id: '1', ...bookData };

      jest.spyOn(prisma.book, 'create').mockResolvedValue(mockBook as any);

      const result = await repository.create(bookData);

      expect(result).toEqual(mockBook);
      expect(prisma.book.create).toHaveBeenCalledWith({ data: bookData });
    });
  });

  describe('findByAuthorId', () => {
    it('should return books by author id', async () => {
      const mockBooks = [
        { id: '1', title: 'Book 1', authorId: 'author-1' },
        { id: '2', title: 'Book 2', authorId: 'author-1' },
      ];

      jest.spyOn(prisma.book, 'findMany').mockResolvedValue(mockBooks as any);

      const result = await repository.findByAuthorId('author-1');

      expect(result).toEqual(mockBooks);
      expect(prisma.book.findMany).toHaveBeenCalledWith({ where: { authorId: 'author-1' } });
    });
  });

  describe('findFavorites', () => {
    it('should return only favorite books', async () => {
      const mockFavorites = [
        { id: '1', title: 'Favorite Book', isFavorite: true },
      ];

      jest.spyOn(prisma.book, 'findMany').mockResolvedValue(mockFavorites as any);

      const result = await repository.findFavorites();

      expect(result).toEqual(mockFavorites);
      expect(prisma.book.findMany).toHaveBeenCalledWith({ where: { isFavorite: true } });
    });
  });
});