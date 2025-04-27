import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AnimeService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
  }

  searchAnime(query: string, page = 1): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/anime/zoro/${encodeURIComponent(query)}?page=${page}`;
    return this.httpService.get(url);
  }

  getAnimeInfo(id: string): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/anime/zoro/info?id=${encodeURIComponent(id)}`;
    return this.httpService.get(url);
  }

  getEpisodeStream(
    episodeId: string,
    serverName = 'vidstreaming',
  ): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/anime/zoro/watch/${encodeURIComponent(episodeId)}?server=${serverName}`;
    return this.httpService.get(url);
  }

  getRecentEpisodes(page = 1): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}/anime/zoro/recent-episodes?page=${page}`;
    return this.httpService.get(url);
  }
}
