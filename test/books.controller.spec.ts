import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../src/books/books.controller';
import { BooksService } from '../src/books/books.service';
import { CreateBookDto } from '../src/books/dto/create-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findFavorites: jest.fn(),
            toggleFavorite: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Harry Potter',
        summary: 'A wizard story',
        publicationYear: 1997,
        authorId: 'author-1',
      };
      const mockBook = { id: '1', ...createBookDto, isFavorite: false };

      jest.spyOn(service, 'create').mockResolvedValue(mockBook);

      const result = await controller.create(createBookDto);

      expect(result).toEqual(mockBook);
      expect(service.create).toHaveBeenCalledWith(createBookDto);
    });
  });

});