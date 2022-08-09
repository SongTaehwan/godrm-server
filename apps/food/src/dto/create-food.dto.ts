import {
  IsEnum,
  IsDate,
  IsString,
  IsNumber,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

import { Category } from 'apps/category/src/schema/category.schema';

export enum StorageType {
  FROZEN = 'frozen',
  CHILLED = 'chilled',
}

export class CreateFoodDto {
  @IsMongoId()
  @IsNotEmpty()
  category: Category;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(StorageType)
  @IsNotEmpty()
  storage_type: StorageType;

  @IsBoolean()
  @IsOptional()
  expired?: boolean;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  expired_at?: Date;

  @IsDate()
  @IsOptional()
  purchased_at?: Date;
}
