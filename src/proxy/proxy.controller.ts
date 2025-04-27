import { Controller, Get, Query, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FastifyReply } from 'fastify';
import { firstValueFrom } from 'rxjs';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async proxy(
    @Query('url') url: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    if (!url) {
      res.statusCode = 400;
      return { message: 'Missing url parameter' };
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          responseType: 'stream',
        }),
      );

      res.header('Access-Control-Allow-Origin', '*');
      res.header('Content-Type', response.headers['content-type']);
      (response.data as NodeJS.ReadableStream).pipe(res.raw);

      return;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Proxy Error:', errorMessage);
      res.statusCode = 500;
      return { message: 'Failed to fetch resource' };
    }
  }
}
