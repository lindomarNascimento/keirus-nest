import { GuardService } from './guard.service';
import { Args, Query, Resolver } from "@nestjs/graphql";

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
