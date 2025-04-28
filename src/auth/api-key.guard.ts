import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string | undefined;

    const validApiKey = this.configService.get<string>('PRIVATE_API_KEY');

    console.log('HEADERS RECEBIDOS:', request.headers);

    return apiKey === validApiKey;
  }
}
