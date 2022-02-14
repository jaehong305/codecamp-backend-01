import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { SubCategory } from '../subCategory/entities/subCategory.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';

interface ICreate {
  createProductInput: CreateProductInput;
}

interface IFindOne {
  productId: string;
}

interface IUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,

    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['mainCategory', 'subCategorys'],
    });
  }

  async findAllwithDeleted() {
    return await this.productRepository.find({
      withDeleted: true,
      relations: ['mainCategory', 'subCategorys'],
    });
  }

  async findOne({ productId }: IFindOne) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['mainCategory', 'subCategorys'],
    });
  }

  async create({ createProductInput }: ICreate) {
    const { mainCategoryId, subCategoryId, ...product } = createProductInput;

    const result1 = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    });

    const result2 = [];
    for (let i = 0; i < subCategoryId.length; i++) {
      const subCategory = await this.subCategoryRepository.findOne({
        id: subCategoryId[i],
      });
      result2.push(subCategory);
    }

    return await this.productRepository.save({
      ...product,
      mainCategory: result1,
      subCategorys: result2,
    });
  }

  async update({ productId, updateProductInput }: IUpdate) {
    const product = await this.productRepository.findOne({ id: productId });
    if (!product) throw new UnprocessableEntityException('없는 상품입니다.');
    const newProduct = {
      ...product,
      ...updateProductInput,
    };
    return await this.productRepository.save(newProduct);
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
