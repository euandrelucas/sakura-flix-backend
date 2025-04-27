/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Query, Res, Req, All } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FastifyReply, FastifyRequest as Request } from 'fastify';
import { firstValueFrom } from 'rxjs';
import { URL } from 'url';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly httpService: HttpService) {}

  @All()
  async proxy(
    @Query('url') url: string,
    @Req() req: Request,
    @Res({ passthrough: false }) res: FastifyReply,
  ) {
    if (req.method === 'OPTIONS') {
      // Libera CORS para preflight request
      res.raw.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      res.raw.end();
      return;
    }

    if (!url) {
      res.statusCode = 400;
      res.send('Missing url parameter');
      return;
    }

    try {
      const decodedUrl = decodeURIComponent(url);

      // Segurança mínima: só permitir proxificar URLs http/https
      if (!/^https?:\/\//i.test(decodedUrl)) {
        res.statusCode = 400;
        res.send('Invalid URL');
        return;
      }

      const response = await firstValueFrom(
        this.httpService.get(decodedUrl, {
          responseType: 'stream',
        }),
      );

      // Determina o Content-Type baseado na resposta original
      const contentType =
        response.headers['content-type'] || 'application/octet-stream';

      res.raw.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': contentType,
      });

      response.data.pipe(res.raw);
    } catch (error) {
      console.error('Proxy error:', error.message || error);
      res.statusCode = 500;
      res.send('Error proxying request');
    }
  }
}
