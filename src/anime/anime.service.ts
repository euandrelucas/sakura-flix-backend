/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AnimeService {
  private readonly baseUrl: string;
  private readonly proxyUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
    this.proxyUrl =
      this.configService.get<string>('PROXY_URL') ||
      'http://localhost:3000/proxy';
  }

  private proxify(url: string): string {
    return `${this.proxyUrl}?url=${encodeURIComponent(url)}`;
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
    return this.httpService.get(url).pipe(
      map((response) => {
        const data = response.data;

        // Proxificar todas as URLs dos sources
        if (Array.isArray(data.sources)) {
          data.sources = data.sources.map((source: { url: string }) => ({
            ...source,
            url: this.proxify(source.url),
          }));
        }

        // Proxificar também as legendas se quiser
        if (Array.isArray(data.subtitles)) {
          data.subtitles = data.subtitles.map((subtitle) => ({
            ...subtitle,
            url: this.proxify(subtitle.url),
          }));
        }

        return data;
      }),
    );
  }
}
