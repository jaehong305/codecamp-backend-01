import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async fetchProducts() {
    return await this.productService.findAll();
  }

  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: number) {
    return await this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return await this.productService.update({ productId, updateProductInput });
  }
}
