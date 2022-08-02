import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  getHello(): string {
    return 'Category';
  }
}
