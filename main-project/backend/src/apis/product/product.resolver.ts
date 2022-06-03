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
    // 1. 레디스에 캐시되어 있는지 확인
    const productsCache = await this.cacheManager.get(`products:${search}`);
    if (productsCache) return productsCache;

    // 2. 레디스에 캐시가 되어있지 않다면, 엘라스틱서치에서 유저가 검색한 검색어로 조회하기
    const result = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match: {
          name: search,
        },
      },
    });
    // console.log(JSON.stringify(elasticResult, null, ' '));

    const products = result.hits.hits.map((e) => ({      
      id: e._source.id,
      name: e._source.name,
      price: e._source.price,      
    }));
    // console.log('e', elasticObj); // 대소문자 구분 x 문제

    // 3. 엘라스틱서치에서 조회 결과가 있다면, 레디스에 검색결과 캐싱
    await this.cacheManager.set(`products:${search}`, products, { ttl: 0 });

    return products;
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
