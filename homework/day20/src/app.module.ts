import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategoryModule } from './apis/mainCategory/mainCategory.module';
import { ProductModule } from './apis/product/product.module';
import { SubCategoryModule } from './apis/subCategory/subCategory.module';
import { UserModule } from './apis/user/user.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    ProductModule,
    MainCategoryModule,
    SubCategoryModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database',
      port: 3306,
      username: 'root',
      password: '159159',
      database: 'cat',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
