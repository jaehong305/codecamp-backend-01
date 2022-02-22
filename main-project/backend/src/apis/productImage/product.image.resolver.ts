import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductImageInput } from './dto/createProductImage.Input';
import { ProductImage } from './entities/product.image.entity';
import { ProductImageService } from './product.image.service';

@Resolver()
export class ProductImageResolver {
  constructor(private readonly productImageService: ProductImageService) {}

  @Mutation(() => [ProductImage])
  async createProductImage(
    @Args('createProductImageInput')
    createProductImageInput: CreateProductImageInput,
  ) {
    return await this.productImageService.create({ createProductImageInput });
  }

  @Mutation(() => [ProductImage])
  async updateProductImage(
    @Args('createProductImageInput')
    createProductImageInput: CreateProductImageInput,
  ) {
    return await this.productImageService.update({ createProductImageInput });
  }
}
