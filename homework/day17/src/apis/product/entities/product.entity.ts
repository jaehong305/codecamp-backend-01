import { Cat } from 'src/apis/cat/entities/cat.entity';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Order } from 'src/apis/order/entities/order.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment') // uuid : 유니크아이디생성 / increment : 숫자증가생성
  id: number;

  @Column()
  name: string;

  @Column() // ({ type: 'text' })
  description: string;

  @Column() // ({ type: 'integer' })
  price: number;

  @Column()
  isWet: boolean;
  // soldedAt: Date

  @Column()
  quantity: number;

  @ManyToOne(() => MainCategory)
  mainCategory: MainCategory;

  @ManyToMany(() => Cat, (cat) => cat.products)
  cats: Cat[];
}
