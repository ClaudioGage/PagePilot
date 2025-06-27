import { IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Full name of the author', example: 'J.K. Rowling' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'Biography of the author', example: 'British author best known for the Harry Potter series' })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ description: 'Year the author was born', example: 1965 })
  @IsNumber()
  birthYear: number;
}