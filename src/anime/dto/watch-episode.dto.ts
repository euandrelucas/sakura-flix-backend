/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class WatchEpisodeDto {
  @ApiProperty({ description: 'ID do episódio para assistir' })
  @IsString()
  episodeId: string;

  @ApiProperty({
    description: 'Nome do servidor de vídeo (ex: vidstreaming)',
    required: false,
  })
  @IsOptional()
  @IsString()
  server?: string;
}
