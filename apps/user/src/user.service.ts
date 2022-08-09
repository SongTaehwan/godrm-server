import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async getAll(): Promise<User[]> {
    const query = this.userModel.find();
    const users = await query.exec();

    return users;
  }

  async getById(id: string): Promise<User> {
    const query = this.userModel.findById(id);
    const user = query.exec();

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(id: string): Promise<User> {
    // TODO: Cart, Favourite, Notification Service import 해와서 DB 에 추가
    const user = new this.userModel(id);
    const result = await user.save();

    return result;
  }

  async delete(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException();
    }

    return {
      id: result._id,
    };
  }
}
