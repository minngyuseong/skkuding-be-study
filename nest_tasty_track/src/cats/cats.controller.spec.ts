import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
  });

  it('should return an array of cats', () => {
    const result = ['Luna', 'Bella', 'Charlie'];
    jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

    expect(catsController.findAll()).toBe(result);
  });
});
