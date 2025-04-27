import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';

@Module({
  imports: [HttpModule],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
