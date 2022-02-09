import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';

interface ICreate {
  createProductInput: CreateProductInput;
}

interface IFindOne {
  productId: number;
}

interface IUpdate {
  productId: number;
  updateProductInput: UpdateProductInput;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['mainCategory'],
    });
  }

  async findAllwithDeleted() {
    return await this.productRepository.find({
      withDeleted: true,
      relations: ['mainCategory'],
    });
  }

  async findOne({ productId }: IFindOne) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['mainCategory'],
    });
  }

  async create({ createProductInput }: ICreate) {
    const { mainCategoryId, ...product } = createProductInput;

    const result = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    });

    return await this.productRepository.save({
      ...product,
      mainCategory: result,
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
