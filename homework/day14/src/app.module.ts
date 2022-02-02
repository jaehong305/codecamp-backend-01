import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StarbucksModule } from './apis/starbucks/starbucks.module';

@Module({
  imports: [
    StarbucksModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
  ],
})
export class AppModule {}
