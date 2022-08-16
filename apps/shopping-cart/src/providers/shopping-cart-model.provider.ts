import {
  ShoppingCart,
  ShoppingCartSchema,
} from '../schema/shopping-cart.schema';

export const ShoppingCartModelProvider = {
  name: ShoppingCart.name,
  schema: ShoppingCartSchema,
};
