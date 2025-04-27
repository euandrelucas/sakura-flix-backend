/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class RecentEpisodesDto {
  @ApiProperty({ description: 'Número da página (opcional)', required: false })
  @IsOptional()
  @IsNumberString()
  page?: string;
}
