import { IsString, IsNumber, IsNotEmpty, MinLength, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book', example: 'Harry Potter and the Philosopher\'s Stone' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @ApiProperty({ description: 'Summary of the book', example: 'A young wizard discovers his magical heritage...' })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({ description: 'Year the book was published', example: 1997 })
  @IsNumber()
  publicationYear: number;

  @ApiProperty({ description: 'UUID of the author', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @ApiProperty({ description: 'Mark book as favorite', required: false })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}