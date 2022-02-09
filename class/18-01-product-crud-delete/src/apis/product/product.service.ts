import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }: IFindOne) {
    return await this.productRepository.findOne({ id: productId });
  }

  // ICreate === { createProductInput: CreateProductInput; }
  async create({ createProductInput }: ICreate) {
    try {
      const product = await this.productRepository.save({
        ...createProductInput, // 스프레드 연산자 사용하기(객체내용복사)
      });
      console.log('에러뜨면 실행x');
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update({ productId, updateProductInput }: IUpdate) {
    const product = await this.productRepository.findOne({ id: productId });
    const newProduct = {
      ...product,
      ...updateProductInput,

      // name: updateProductInput.name,
      // description: updateProductInput.description,
      // price: updateProductInput.price,
    };
    return await this.productRepository.save(newProduct);

    // await this.productRepository.update( // save는 수정(이미있는id),등록 후 리턴값 돌려줌, update는 X
    //   { id: productId },
    //   { ...updateProductInput },
    // );
    // return '수정완료';
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({ id: productId });
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    // throw new HttpException(
    //   '이미 판매 완료된 상품입니다.',
    //   HttpStatus.UNPROCESSABLE_ENTITY, // 422
    // );
  }

  async delete({ productId }) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제 - 직접구현1
    // const result = await this.productRepository.update({ id: productId }, { isDeleted: true });
    // return result.affected ? true : false;
    //
    // 3. 소프트 삭제 - 직접구현2
    // await this.productRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );
    //
    // 4. 소프트삭제 - TypeORM 제공1
    // await this.productRepository.softRemove({ id: productId }) // id로만 삭제가능
    //
    // 5. 소프트삭제 - TypeORM 제공2
    const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
