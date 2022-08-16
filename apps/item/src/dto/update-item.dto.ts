import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

const USER = 'user';

export class UpdateItemDto extends PartialType(
  OmitType(CreateItemDto, [USER]),
) {}
