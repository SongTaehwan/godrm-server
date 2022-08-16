import {
  IsEnum,
  IsDate,
  IsString,
  IsNumber,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsUppercase,
} from 'class-validator';

import { Category } from '../../../category/src/schema/category.schema';

export enum StorageType {
  FROZEN = 'FROZEN',
  CHILLED = 'CHILLED',
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
  @IsUppercase()
  storage_type: StorageType;

  @IsBoolean()
  @IsOptional()
  expired?: boolean;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;

  @IsDate()
  @IsOptional()
  expired_at?: Date;

  @IsDate()
  @IsOptional()
  purchased_at?: Date;

  @IsMongoId()
  @IsOptional()
  user?: string;
}
