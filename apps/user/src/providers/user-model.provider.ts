import { User, UserSchema } from '../schema/user.schema';

export const UserModelProvider = {
  name: User.name,
  schema: UserSchema,
};
