import { Injectable } from '@nestjs/common';

@Injectable()
export class FavouriteService {
  getHello(): string {
    return 'My favourite!';
  }
}
