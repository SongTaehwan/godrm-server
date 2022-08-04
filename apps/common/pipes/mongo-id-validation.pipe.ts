import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!isMongoId(value)) {
      throw new BadRequestException('Invalid ID');
    }

    return value;
  }
}
