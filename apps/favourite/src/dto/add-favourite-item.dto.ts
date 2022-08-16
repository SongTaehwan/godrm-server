import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AddFavouriteItemDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  itemId: string;
}
