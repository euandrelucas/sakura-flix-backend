import { Module } from '@nestjs/common';
import { AnimeDbController } from './anime-db.controller';
import { AnimeDbService } from './anime-db.service';

@Module({
  controllers: [AnimeDbController],
  providers: [AnimeDbService],
})
export class AnimeDbModule {}
