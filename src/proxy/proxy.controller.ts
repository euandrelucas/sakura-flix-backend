/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Query, Res, Req, All } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FastifyReply, FastifyRequest as Request } from 'fastify';
import { firstValueFrom } from 'rxjs';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly httpService: HttpService) {}

  @All()
  async proxy(
    @Query('url') url: string,
    @Req() req: Request,
    @Res({ passthrough: false }) res: FastifyReply,
  ) {
    // Se for uma preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.statusCode = 204;
      res.send();
      return;
    }

    if (!url) {
      res.statusCode = 400;
      res.send('Missing url parameter');
      return;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          responseType: 'stream',
        }),
      );

      // Headers CORS
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Content-Type vindo da resposta original
      res.header(
        'Content-Type',
        response.headers['content-type'] || 'application/octet-stream',
      );

      response.data.pipe(res.raw);
    } catch (error) {
      console.error('Proxy error:', error.message);
      res.statusCode = 500;
      res.send('Error proxying request');
    }
  }
}
