import { Test, TestingModule } from '@nestjs/testing';
import { AnimeDbController } from './anime-db.controller';

describe('AnimeDbController', () => {
  let controller: AnimeDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeDbController],
    }).compile();

    controller = module.get<AnimeDbController>(AnimeDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
