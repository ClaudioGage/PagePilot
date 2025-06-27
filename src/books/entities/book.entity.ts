import { ApiProperty } from '@nestjs/swagger';

export class Book {
  @ApiProperty({ description: 'Unique identifier for the book' })
  id: string;

  @ApiProperty({ description: 'Title of the book' })
  title: string;

  @ApiProperty({ description: 'Summary of the book' })
  summary: string;

  @ApiProperty({ description: 'Year the book was published' })
  publicationYear: number;

  @ApiProperty({ description: 'ID of the author who wrote the book' })
  authorId: string;

  @ApiProperty({ description: 'Whether the book is marked as favorite', required: false })
  isFavorite?: boolean;
}