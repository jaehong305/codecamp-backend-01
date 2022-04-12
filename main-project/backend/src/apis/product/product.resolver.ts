import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  async fetchProducts(@Args('search') search: string) {
    const redisResult = await this.cacheManager.get(search);
    console.log('r', redisResult);
    if (redisResult) return redisResult;

    const elasticResult = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match: {
          name: search,
        },
      },
    });
    // console.log(JSON.stringify(elasticResult, null, ' '));
    const elasticObj = elasticResult.hits.hits.map((e) => {
      const obj = JSON.parse(JSON.stringify(e._source));
      const obj2 = {};
      for (let key in obj) {
        if (!key.includes('@')) obj2[key] = obj[key];
      }
      return obj2;
    });
    console.log('e', elasticObj); // 대소문자 구분 x 문제
    await this.cacheManager.set(search, elasticObj, { ttl: 0 });
    return elasticObj;
    // return await this.productService.findAll();
  }

  @Query(() => [Product])
  async fetchProductsAll() {
    return await this.productService.findAllwithDeleted();
  }

  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: string) {
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
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('productId') productId: string) {
    return await this.productService.delete({ productId });
  }

  @Mutation(() => Boolean)
  async restoreProduct(@Args('productId') productId: string) {
    return await this.productService.restore({ productId });
  }
}
