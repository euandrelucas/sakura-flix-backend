import { Test, TestingModule } from '@nestjs/testing';
import { AnimeDbService } from './anime-db.service';

describe('AnimeDbService', () => {
  let service: AnimeDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeDbService],
    }).compile();

    service = module.get<AnimeDbService>(AnimeDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
