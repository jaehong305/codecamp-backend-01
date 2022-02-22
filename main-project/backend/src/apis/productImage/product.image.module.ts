import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductImage } from './entities/product.image.entity';
import { ProductImageResolver } from './product.image.resolver';
import { ProductImageService } from './product.image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage, Product])],
  providers: [ProductImageResolver, ProductImageService],
})
export class ProductImageModule {}
