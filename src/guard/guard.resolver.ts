import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { GuardService } from './guard.service';
import { Args, Query, Resolver } from "@nestjs/graphql";
import { GuardGuard } from './guard.guard';

@Resolver('Guard')
export class GuardResolver {
  constructor(
    private userGuard: GuardService
  ) { }

  @Query()
  async signIn(@Args('loginUser') { email, password }) {
    return this.userGuard.signIn(email, password)
  }
}
