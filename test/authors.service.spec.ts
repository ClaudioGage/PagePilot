import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../src/authors/authors.service';
import { AuthorsRepository } from '../src/authors/authors.repository';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository: AuthorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: AuthorsRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get<AuthorsRepository>(AuthorsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', async () => {
      const createDto = { name: 'J.K. Rowling', bio: 'British author', birthYear: 1965 };
      const mockAuthor = { id: '1', ...createDto };

      jest.spyOn(repository, 'create').mockResolvedValue(mockAuthor);

      const result = await service.create(createDto);

      expect(result).toEqual(mockAuthor);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findOne', () => {
    it('should return an author', async () => {
      const mockAuthor = { id: '1', name: 'J.K. Rowling', bio: 'British author', birthYear: 1965 };

      jest.spyOn(repository, 'findById').mockResolvedValue(mockAuthor);

      const result = await service.findOne('1');

      expect(result).toEqual(mockAuthor);
    });

    it('should throw NotFoundException when author not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });
});