import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../../apps/user/src/user.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

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

  async createToken(deviceId: string) {
    try {
      const user = await this.userService.getByDeviceId(deviceId);
      return this.generateToken(user._id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.create(deviceId);
        return this.generateToken(user._id);
      }

      this.logger.error(error);
    }

    return;
  }

  async refreshToken() {}
}
