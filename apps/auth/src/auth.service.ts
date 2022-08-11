import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/src/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(id: string) {
    const payload = {
      sub: id,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  async createToken(id: string) {
    try {
      const user = await this.userService.getByDeviceId(id);
      return this.generateToken(user._id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.create(id);
        return this.generateToken(user._id);
      }
    }
  }

  async refreshToken() {}
}
