import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsRepository } from '../src/authors/authors.repository';
import { Author } from '../src/authors/entities/author.entity';

describe('AuthorsRepository', () => {
  let repository: AuthorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsRepository],
    }).compile();

    repository = module.get<AuthorsRepository>(AuthorsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an author', () => {
      const author: Author = {
        id: '1',
        name: 'J.K. Rowling',
        bio: 'British author',
        birthYear: 1965,
      };

      const result = repository.create(author);

      expect(result).toEqual(author);
      expect(repository.findById('1')).toEqual(author);
    });
  });

  describe('findAll', () => {
    it('should return all authors', () => {
      const author1: Author = {
        id: '1',
        name: 'J.K. Rowling',
        bio: 'British author',
        birthYear: 1965,
      };
      const author2: Author = {
        id: '2',
        name: 'Stephen King',
        bio: 'American author',
        birthYear: 1947,
      };

      repository.create(author1);
      repository.create(author2);

      const result = repository.findAll();
      expect(result).toHaveLength(2);
      expect(result).toContain(author1);
      expect(result).toContain(author2);
    });
  });

  describe('findById', () => {
    it('should return author by id', () => {
      const author: Author = {
        id: '1',
        name: 'J.K. Rowling',
        bio: 'British author',
        birthYear: 1965,
      };

      repository.create(author);
      const result = repository.findById('1');

      expect(result).toEqual(author);
    });

    it('should return undefined for non-existent id', () => {
      const result = repository.findById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('exists', () => {
    it('should return true for existing author', () => {
      const author: Author = {
        id: '1',
        name: 'J.K. Rowling',
        bio: 'British author',
        birthYear: 1965,
      };

      repository.create(author);
      expect(repository.exists('1')).toBe(true);
    });

    it('should return false for non-existent author', () => {
      expect(repository.exists('999')).toBe(false);
    });
  });
});