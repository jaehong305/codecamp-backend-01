import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from '../../productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from '../../productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../../productTag/entities/productTag.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid') // uuid : 유니크아이디생성 / increment : 숫자증가생성
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column() // ({ type: 'text' })
  @Field(() => String, { nullable: true })
  description: string;

  @Column() // ({ type: 'integer' })
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;
  // soldedAt: Date

  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  // @DeleteDateColumn()
  // deletedAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  // @JoinColumn() Many는 생략가능 One으로 시작은 조인명시
  @ManyToOne(() => ProductCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable() // 다대다 중간테이블 두 테이블중 한쪽만 입력하면된다. // 원하는 컬럼값을 추가해주려면 자동생성하지않고 테이블을 생성후 1대다로 연결해주어야한다.
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 상대 테이블도 어떤 컬럼을 가져오는지 명시
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
