import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private authorsRepository: AuthorsRepository) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return this.authorsRepository.create(createAuthorDto);
  }

  async findAll() {
    return this.authorsRepository.findAll();
  }

  async findOne(id: string) {
    const author = await this.authorsRepository.findById(id);
    if (!author) throw new NotFoundException(`Author ${id} not found`);
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorsRepository.update(id, updateAuthorDto);
    if (!author) throw new NotFoundException(`Author ${id} not found`);
    return author;
  }

  async remove(id: string) {
    const deleted = await this.authorsRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Author ${id} not found`);
  }
}