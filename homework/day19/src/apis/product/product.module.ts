import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, MainCategory])],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
