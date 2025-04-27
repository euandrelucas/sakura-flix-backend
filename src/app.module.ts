import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimeModule } from './anime/anime.module';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './proxy/proxy.module'; // Aqui importa o módulo (não o controller)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnimeModule,
    ProxyModule,
  ],
  controllers: [AppController], // <- aqui fica só AppController (tirar ProxyController)
  providers: [AppService],
})
export class AppModule {}
