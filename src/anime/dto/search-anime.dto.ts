/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class SearchAnimeDto {
  @ApiProperty({ description: 'Texto da busca (ex: Naruto)' })
  @IsString()
  q: string;

  @ApiProperty({ description: 'Número da página (opcional)', required: false })
  @IsOptional()
  @IsNumberString()
  page?: string;
}
