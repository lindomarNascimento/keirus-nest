import { Module } from '@nestjs/common';

import { UserModel } from './user.repository';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserModel, UserService, UserResolver],
  exports: [UserService]
})
export class UserModule { }
