import { Logger, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';

import {
  User,
  UserModel,
  UserDocument,
} from '../../../../apps/user/src/schema/user.schema';

export interface JwtPayload {
  sub: string;
}

export interface AuthPayload {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);

  constructor(@InjectModel(User.name) private userModel: UserModel) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  async validate({ sub }: JwtPayload): Promise<UserDocument> {
    const user = await this.userModel.findById(sub);

    if (!user) {
      this.logger.error(`User not exit: ${sub}`);
      throw new UnauthorizedException();
    }

    return user; // 리턴 값을 req.user 로 세팅
  }
}
