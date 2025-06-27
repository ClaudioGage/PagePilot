import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({ status: 201, description: 'Author successfully created', type: Author })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'List of all authors', type: [Author] })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiResponse({ status: 200, description: 'Author found', type: Author })
  @ApiResponse({ status: 404, description: 'Author not found' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiResponse({ status: 200, description: 'Author successfully updated', type: Author })
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
    return this.authorsService.remove(id);
  }
}