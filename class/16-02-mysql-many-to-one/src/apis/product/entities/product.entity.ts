import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid') // uuid : 유니크아이디생성 / increment : 숫자증가생성
  id: string;

  @Column()
  name: string;

  @Column() // ({ type: 'text' })
  description: string;

  @Column() // ({ type: 'integer' })
  price: number;

  @Column()
  isSoldout: boolean;
  // soldedAt: Date

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  // @JoinColumn() Many는 생략가능 One으로 시작은 조인명시
  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;
}
