import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AddShoppingCartItemDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  itemId: string;
}
