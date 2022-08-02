import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodService {
  getHello(): string {
    return 'Food!';
  }
}
