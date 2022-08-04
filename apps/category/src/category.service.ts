import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  get(id: string): string {
    return `Mongo ID: ${id}`;
  }

  getAll() {
    return 'Fetch all';
  }

  create() {
    return 'Created!';
  }

  delete() {
    return 'Deleted';
  }
}
