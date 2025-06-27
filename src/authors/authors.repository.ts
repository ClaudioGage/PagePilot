import { Injectable } from '@nestjs/common';
import { IRepository } from '../utils/interfaces/repository.interfaces';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsRepository implements IRepository<Author> {
  private authors: Author[] = [];

  create(author: Author): Author {
    this.authors.push(author);
    return author;
  }

  findAll(): Author[] {
    return this.authors;
  }

  findById(id: string): Author | undefined {
    return this.authors.find(author => author.id === id);
  }

  update(id: string, updateData: Partial<Author>): Author | undefined {
    const index = this.authors.findIndex(author => author.id === id);
    if (index === -1) return undefined;
    
    this.authors[index] = { ...this.authors[index], ...updateData };
    return this.authors[index];
  }

  delete(id: string): boolean {
    const index = this.authors.findIndex(author => author.id === id);
    if (index === -1) return false;
    
    this.authors.splice(index, 1);
    return true;
  }

  exists(id: string): boolean {
    return this.findById(id) !== undefined;
  }

  findByName(name: string): Author | undefined {
    return this.findAll().find(author => 
      author.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  findByBirthYear(year: number): Author[] {
    return this.findAll().filter(author => author.birthYear === year);
  }
}