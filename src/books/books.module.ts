import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksRepository, BooksService],
})
export class BooksModule {}