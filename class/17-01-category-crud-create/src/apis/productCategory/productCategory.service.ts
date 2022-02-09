import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepoistory: Repository<ProductCategory>,
  ) {}

  async create({ name }) {
    // 카테고리를 데이터베이스에 저장
    return await this.productCategoryRepoistory.save({ name }); // .create() 추가 후 불러오진 않음
  }
}
