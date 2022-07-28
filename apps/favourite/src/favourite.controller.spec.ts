import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';

describe('FavouriteController', () => {
  let favouriteController: FavouriteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FavouriteController],
      providers: [FavouriteService],
    }).compile();

    favouriteController = app.get<FavouriteController>(FavouriteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(favouriteController.getHello()).toBe('Hello World!');
    });
  });
});
