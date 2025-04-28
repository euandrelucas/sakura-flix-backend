import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimeModule } from './anime/anime.module';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './proxy/proxy.module'; // Aqui importa o módulo (não o controller)
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AnimeDbModule } from './anime-db/anime-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnimeModule,
    ProxyModule,
    PrismaModule,
    AuthModule,
    UserModule,
    HistoryModule,
    CommentModule,
    FavoriteModule,
    AnimeDbModule,
  ],
  controllers: [AppController], // <- aqui fica só AppController (tirar ProxyController)
  providers: [AppService],
})
export class AppModule {}
