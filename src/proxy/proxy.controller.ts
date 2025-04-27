/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
    @Res({ passthrough: false }) res: FastifyReply,
  ) {
    if (!url) {
      res.statusCode = 400;
      res.send('Missing url');
      return;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          responseType: 'stream',
        }),
      );

      res.header('Access-Control-Allow-Origin', '*');
      res.header('Content-Type', response.headers['content-type']);

      response.data.pipe(res.raw); // aqui você está assumindo o controle total

      // NÃO retorna mais nada aqui!
    } catch (error) {
      console.error('Proxy error:', error.message);
      res.statusCode = 500;
      res.send('Error proxying request');
    }
  }
}
