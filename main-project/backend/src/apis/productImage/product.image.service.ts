import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductImage } from './entities/product.image.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create({ createProductImageInput }) {
    const product = await this.productRepository.findOne({
      id: createProductImageInput.productId,
    });

    const productImages = await Promise.all(
      createProductImageInput.urls.map((url, i) =>
        this.productImageRepository.save({
          url,
          isMain: createProductImageInput.isMains[i],
          product,
        }),
      ),
    );

    return productImages;
  }

  async update({ createProductImageInput }) {
    await this.productImageRepository.softDelete({
      product: createProductImageInput.productId,
    });

    const product = await this.productRepository.findOne({
      id: createProductImageInput.productId,
    });

    return await Promise.all(
      createProductImageInput.urls.map((url, i) =>
        this.productImageRepository.save({
          url,
          isMain: createProductImageInput.isMains[i],
          product,
        }),
      ),
    );
  }
}
