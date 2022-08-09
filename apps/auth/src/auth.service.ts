import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User, UserModel } from '../../user/src/schema/user.schema';
import { UserService } from '../../user/src/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // @ts-ignore
  async login({ _id }: UserModel) {
    const payload = {
      sub: _id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
