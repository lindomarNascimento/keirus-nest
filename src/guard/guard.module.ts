import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { GuardResolver } from './guard.resolver';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5s' },
    }),
  ],
  providers: [GuardService, GuardResolver]
})
export class GuardModule { }
