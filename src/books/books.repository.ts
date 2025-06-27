import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Book, 'id'>): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async findById(id: string): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Book>): Promise<Book | null> {
    try {
      return await this.prisma.book.update({ where: { id }, data });
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.book.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async findByAuthorId(authorId: string): Promise<Book[]> {
    return this.prisma.book.findMany({ where: { authorId } });
  }

  async findFavorites(): Promise<Book[]> {
    return this.prisma.book.findMany({ where: { isFavorite: true } });
  }
}