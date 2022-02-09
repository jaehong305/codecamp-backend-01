import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
}
