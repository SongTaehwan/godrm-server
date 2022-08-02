import { Injectable } from '@nestjs/common';

@Injectable()
export class ShoppingCartService {
  getHello(): string {
    return 'Cart!';
  }
}
