import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto extends PartialType(
  OmitType(CreateFoodDto, ['user']),
) {}
