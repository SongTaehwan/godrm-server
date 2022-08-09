import {
  Logger,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '../../../user/src/schema/user.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(id: string): Promise<User> {
    try {
      const user = await this.authService.validateUser(id);

      if (user === null) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      this.logger.error(`STATUS ${error.status}: ${error.message}`);

      if (error.status === 404) {
        throw new NotFoundException();
      }
    }
  }
}
