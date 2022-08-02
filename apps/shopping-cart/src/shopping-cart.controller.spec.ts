import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartController', () => {
  let shoppingCartController: ShoppingCartController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartController],
      providers: [ShoppingCartService],
    }).compile();

    shoppingCartController = app.get<ShoppingCartController>(ShoppingCartController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shoppingCartController.getHello()).toBe('Hello World!');
    });
  });
});
