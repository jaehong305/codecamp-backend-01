import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async fetchUsers() {
    return await this.userService.findAll();
  }

  @Query(() => [User])
  async fetchUsersAll() {
    return await this.userService.findAllwithDeleted();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchUser(@CurrentUser() currentUser: ICurrentUser) {
    return await this.userService.findOne({ userId: currentUser.id });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    return await this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10);
    return await this.userService.update({
      userId: currentUser.id,
      updateUserInput,
    });
  }

  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => String)
  // async updatePassword(@CurrentUser() currentUser: ICurrentUser) {
  //   return await this.userService.update;
  // }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(@CurrentUser() currentUser: ICurrentUser) {
    return await this.userService.delete({ userId: currentUser.id });
  }
}
