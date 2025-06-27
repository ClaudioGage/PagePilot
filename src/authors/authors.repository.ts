import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Author, 'id'>): Promise<Author> {
    return this.prisma.author.create({ data });
  }

  async findAll(): Promise<Author[]> {
    return this.prisma.author.findMany();
  }

  async findById(id: string): Promise<Author | null> {
    return this.prisma.author.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Author>): Promise<Author | null> {
    try {
      return await this.prisma.author.update({ where: { id }, data });
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.author.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.author.count({ where: { id } });
    return count > 0;
  }
}