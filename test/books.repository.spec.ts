import { Test, TestingModule } from '@nestjs/testing';
import { BooksRepository } from '../src/books/books.repository';
import { Book } from '../src/books/entities/book.entity';

describe('BooksRepository', () => {
  let repository: BooksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksRepository],
    }).compile();

    repository = module.get<BooksRepository>(BooksRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a book', () => {
      const book: Book = {
        id: '1',
        title: 'Harry Potter',
        summary: 'A wizard story',
        publicationYear: 1997,
        authorId: 'author-1',
        isFavorite: false,
      };

      const result = repository.create(book);

      expect(result).toEqual(book);
      expect(repository.findById('1')).toEqual(book);
    });
  });

  describe('findByAuthorId', () => {
    it('should return books by author id', () => {
      const book1: Book = {
        id: '1',
        title: 'Harry Potter 1',
        summary: 'First book',
        publicationYear: 1997,
        authorId: 'author-1',
        isFavorite: false,
      };
      const book2: Book = {
        id: '2',
        title: 'Harry Potter 2',
        summary: 'Second book',
        publicationYear: 1998,
        authorId: 'author-1',
        isFavorite: false,
      };
      const book3: Book = {
        id: '3',
        title: 'Different Book',
        summary: 'Different author',
        publicationYear: 2000,
        authorId: 'author-2',
        isFavorite: false,
      };

      repository.create(book1);
      repository.create(book2);
      repository.create(book3);

      const result = repository.findByAuthorId('author-1');
      expect(result).toHaveLength(2);
      expect(result).toContain(book1);
      expect(result).toContain(book2);
      expect(result).not.toContain(book3);
    });
  });

  describe('findFavorites', () => {
    it('should return only favorite books', () => {
      const book1: Book = {
        id: '1',
        title: 'Favorite Book',
        summary: 'This is favorite',
        publicationYear: 1997,
        authorId: 'author-1',
        isFavorite: true,
      };
      const book2: Book = {
        id: '2',
        title: 'Regular Book',
        summary: 'Not favorite',
        publicationYear: 1998,
        authorId: 'author-1',
        isFavorite: false,
      };

      repository.create(book1);
      repository.create(book2);

      const result = repository.findFavorites();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(book1);
    });
  });
});