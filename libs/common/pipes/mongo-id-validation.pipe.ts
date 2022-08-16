import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isEmpty, isMongoId } from 'class-validator';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (isEmpty(value)) {
      throw new BadRequestException('Empty ID');
    }

    if (!isMongoId(value)) {
      throw new BadRequestException(`Invalid ID: ${value}`);
    }

    return value;
  }
}
