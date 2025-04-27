/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Query } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { map } from 'rxjs/operators';

@ApiTags('Anime') // Agrupa no Swagger
@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('search')
  @ApiOperation({ summary: 'Pesquisar animes' })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Texto da busca (ex: Naruto)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (padrão 1)',
  })
  @ApiResponse({ status: 200, description: 'Lista de animes encontrados' })
  search(@Query('q') query: string, @Query('page') page = 1) {
    return this.animeService
      .searchAnime(query, Number(page))
      .pipe(map((response) => response.data));
  }

  @Get('info')
  @ApiOperation({ summary: 'Obter detalhes de um anime' })
  @ApiQuery({ name: 'id', required: true, description: 'ID do anime' })
  @ApiResponse({ status: 200, description: 'Detalhes do anime' })
  info(@Query('id') id: string) {
    return this.animeService
      .getAnimeInfo(id)
      .pipe(map((response) => response.data));
  }

  @Get('watch')
  @ApiOperation({ summary: 'Obter link de um episódio' })
  @ApiQuery({
    name: 'episodeId',
    required: true,
    description: 'ID do episódio',
  })
  @ApiQuery({
    name: 'server',
    required: false,
    description: 'Servidor de streaming (ex: vidstreaming)',
  })
  @ApiResponse({ status: 200, description: 'Link do vídeo do episódio' })
  watch(
    @Query('episodeId') episodeId: string,
    @Query('server') server = 'vidstreaming',
  ) {
    return this.animeService
      .getEpisodeStream(episodeId, server)
      .pipe(map((response) => response.data));
  }

  @Get('recent')
  @ApiOperation({ summary: 'Listar episódios recentes' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (padrão 1)',
  })
  @ApiResponse({ status: 200, description: 'Lista de episódios recentes' })
  recent(@Query('page') page = 1) {
    return this.animeService
      .getRecentEpisodes(Number(page))
      .pipe(map((response) => response.data));
  }
}
