import { Controller, Get } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Query(() => String)
  fetchBoards() {
    return 'fetchBoards를 요청하셨습니다.';
  }
}
