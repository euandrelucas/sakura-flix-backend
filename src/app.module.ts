import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimeModule } from './anime/anime.module';
import { ConfigModule } from '@nestjs/config';
import { ProxyController } from './proxy/proxy.controller';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnimeModule,
    ProxyModule,
  ],
  controllers: [AppController, ProxyController],
  providers: [AppService],
})
export class AppModule {}
