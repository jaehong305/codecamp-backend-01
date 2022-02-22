import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { MainCategoryModule } from './apis/mainCategory/mainCategory.module';
import { ProductModule } from './apis/product/product.module';
import { SubCategoryModule } from './apis/subCategory/subCategory.module';
import { UserModule } from './apis/user/user.module';
import { ConfigModule } from '@nestjs/config';
//import { OrderModule } from './apis/order/order.module';
//import { PaymentModule } from './apis/payment/payment.module';
import { OrderModule } from './apis/order/order.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MainCategoryModule,
    OrderModule,
    //PaymentModule,
    SubCategoryModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
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
