import { ApiProperty } from '@nestjs/swagger';

export class Author {
  @ApiProperty({ description: 'Unique identifier for the author' })
  id: string;

  @ApiProperty({ description: 'Full name of the author' })
  name: string;

  @ApiProperty({ description: 'Biography of the author' })
  bio: string;

  @ApiProperty({ description: 'Year the author was born' })
  birthYear: number;
}