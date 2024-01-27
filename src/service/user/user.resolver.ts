import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "src/service/user/user.service";
import { UpdateUser, UserInterface } from "./user.repository";

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService
  ) { }

  @Query()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Mutation()
  async createUser(@Args('userInput') userInput: UserInterface) {
    return this.userService.createUser(userInput)
  }

  @Mutation()
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id)
  }

  @Mutation()
  async updateUser(
    @Args('userInput') userInput: UpdateUser) {
    return this.userService.updateUser(userInput)
  }
}

