/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InfoAnimeDto {
  @ApiProperty({ description: 'ID do anime para buscar informações' })
  @IsString()
  id: string;
}
