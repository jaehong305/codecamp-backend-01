import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
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

    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async findOne({ productId }: IFindOne) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  // ICreate === { createProductInput: CreateProductInput; }
  async create({ createProductInput }: ICreate) {
    // 1. 상품만 등록하는 경우
    // try {
    //   const product = await this.productRepository.save({
    //     ...createProductInput, // 스프레드 연산자 사용하기(객체내용복사)
    //   });
    //   console.log('에러뜨면 실행x');
    //   return product;
    // } catch (error) {
    //   throw error;
    // }
    //
    // 2. 상품과 상품거래위치 테이블을 연결하여 등록하기
    console.log(createProductInput);
    // 2-1. 하나하나 분해하기
    // const product = {
    //   name: createProductInput.name,
    //   description: createProductInput.description,
    //   price: createProductInput.price
    // }
    // const productSaleslocation = createProductInput.productSaleslocation
    //
    // 2-2. 한번에 분해하기
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const result2 = await this.productCategoryRepository.findOne({
      id: productCategoryId,
    });

    return await this.productRepository.save({
      ...product,
      productSaleslocation: result, // {id: result.id} // id만 안넣어주고 result를 넣어주면 돌려줄때 정보 같이 돌려줌.
      productCategory: result2, // {id: productCategoryId} // 존재 체크후 아이디만 넣어줘도 상관x 하지만 정보없어서 리턴 에러. 리턴 필요없으면 아이디만 등록하는게 효율적.
    });
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
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;
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
    // const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능
    // return result.affected ? true : false;
  }
}
