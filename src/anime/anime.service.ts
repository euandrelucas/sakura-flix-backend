import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AnimeService {
  private baseUrl = 'http://154.53.33.246:5281';

  constructor(private readonly httpService: HttpService) {}

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
