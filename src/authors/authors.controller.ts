import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { AuthorsService } from './authors.service';
  import { CreateAuthorDto } from './dto/create-author.dto';
  import { UpdateAuthorDto } from './dto/update-author.dto';
  
  @ApiTags('authors')
  @Controller('authors')
  export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new author' })
    @ApiResponse({ status: 201, description: 'Author successfully created' })
    create(@Body() createAuthorDto: CreateAuthorDto) {
      return this.authorsService.create(createAuthorDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all authors' })
    @ApiResponse({ status: 200, description: 'List of all authors' })
    findAll() {
      return this.authorsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get author by ID' })
    @ApiParam({ name: 'id', description: 'Author ID' })
    @ApiResponse({ status: 200, description: 'Author found' })
    @ApiResponse({ status: 404, description: 'Author not found' })
    findOne(@Param('id') id: string) {
      return this.authorsService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update author by ID' })
    @ApiParam({ name: 'id', description: 'Author ID' })
    @ApiResponse({ status: 200, description: 'Author successfully updated' })
    @ApiResponse({ status: 404, description: 'Author not found' })
    update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
      return this.authorsService.update(id, updateAuthorDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete author by ID' })
    @ApiParam({ name: 'id', description: 'Author ID' })
    @ApiResponse({ status: 200, description: 'Author successfully deleted' })
    @ApiResponse({ status: 404, description: 'Author not found' })
    remove(@Param('id') id: string) {
      this.authorsService.remove(id);
      return { message: 'Author successfully deleted' };
    }
  
    @Get(':id/books')
    @ApiOperation({ summary: 'Get all books by author' })
    @ApiParam({ name: 'id', description: 'Author ID' })
    @ApiResponse({ status: 200, description: 'List of books by author' })
    @ApiResponse({ status: 404, description: 'Author not found' })
    findBooksByAuthor(@Param('id') id: string) {
      return this.authorsService.findBooksByAuthor(id);
    }
  }