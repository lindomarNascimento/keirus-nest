import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface, UserModel } from 'src/service/user/user.repository';
import { jwtConstants } from './contants';

@Injectable()
export class GuardService {
  constructor(
    private jwtService: JwtService
  ) { }

  async signIn(email: string, passoword: string):
    Promise<{ token: string, email: string }> {
    const isUserValid = await UserModel.findOne({ email });

    if (!isUserValid?.id) throw new UnauthorizedException();

    const currentPassword = passoword;

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      String(isUserValid.password))

    if (!isCorrectPassword) throw new UnauthorizedException();

    const res = isUserValid.toObject() as UserInterface;

    const payload = { sub: isUserValid.ID, username: email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      token: access_token,
      email: res.email,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers.has('authorization')) return
    const [type, token] = request.headers.get('authorization')?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}