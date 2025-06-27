import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsRepository } from '../src/authors/authors.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthorsRepository', () => {
  let repository: AuthorsRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsRepository,
        {
          provide: PrismaService,
          useValue: {
            author: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<AuthorsRepository>(AuthorsRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', async () => {
      const authorData = { name: 'J.K. Rowling', bio: 'British author', birthYear: 1965 };
      const mockAuthor = { id: '1', ...authorData };

      jest.spyOn(prisma.author, 'create').mockResolvedValue(mockAuthor as any);

      const result = await repository.create(authorData);

      expect(result).toEqual(mockAuthor);
      expect(prisma.author.create).toHaveBeenCalledWith({ data: authorData });
    });
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      const mockAuthors = [
        { id: '1', name: 'J.K. Rowling', bio: 'British author', birthYear: 1965 },
        { id: '2', name: 'Stephen King', bio: 'American author', birthYear: 1947 },
      ];

      jest.spyOn(prisma.author, 'findMany').mockResolvedValue(mockAuthors as any);

      const result = await repository.findAll();

      expect(result).toEqual(mockAuthors);
      expect(prisma.author.findMany).toHaveBeenCalled();
    });
  });

  describe('exists', () => {
    it('should return true for existing author', async () => {
      jest.spyOn(prisma.author, 'count').mockResolvedValue(1);

      const result = await repository.exists('1');

      expect(result).toBe(true);
      expect(prisma.author.count).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return false for non-existent author', async () => {
      jest.spyOn(prisma.author, 'count').mockResolvedValue(0);

      const result = await repository.exists('999');

      expect(result).toBe(false);
    });
  });
});