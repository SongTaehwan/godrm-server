import { Food, FoodSchema } from '../schema/food.schema';

export const ItemModelProvider = {
  name: Food.name,
  schema: FoodSchema,
};
