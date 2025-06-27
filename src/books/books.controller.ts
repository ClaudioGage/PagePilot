import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book successfully created', type: Book })
  @ApiResponse({ status: 400, description: 'Invalid input data or author not found' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of all books', type: [Book] })
  findAll() {
    return this.booksService.findAll();
  }

  @Get('favorites')
  @ApiOperation({ summary: 'Get all favorite books' })
  @ApiResponse({ status: 200, description: 'List of favorite books', type: [Book] })
  findFavorites() {
    return this.booksService.findFavorites();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book found', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book successfully updated', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 400, description: 'Invalid author ID' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Put(':id/favorite')
  @ApiOperation({ summary: 'Toggle book favorite status' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book favorite status toggled', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  toggleFavorite(@Param('id') id: string) {
    return this.booksService.toggleFavorite(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book successfully deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}