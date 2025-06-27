import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from '../src/authors/authors.controller';
import { AuthorsService } from '../src/authors/authors.service';
import { CreateAuthorDto } from '../src/authors/dto/create-author.dto';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'J.K. Rowling',
        bio: 'British author',
        birthYear: 1965,
      };
      const mockAuthor = { id: '1', ...createAuthorDto };

      jest.spyOn(service, 'create').mockResolvedValue(mockAuthor);

      const result = await controller.create(createAuthorDto);

      expect(result).toEqual(mockAuthor);
      expect(service.create).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const mockAuthors = [
        { id: '1', name: 'J.K. Rowling', bio: 'British author', birthYear: 1965 },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockAuthors);

      const result = await controller.findAll();

      expect(result).toEqual(mockAuthors);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});