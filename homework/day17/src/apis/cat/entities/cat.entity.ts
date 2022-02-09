import { CatDetail } from 'src/apis/catDetail/entities/catDetail.entity';
import { Product } from 'src/apis/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  intro: string;

  @Column({ type: 'text' })
  history: string;

  @JoinTable()
  @ManyToMany(() => Product, (products) => products.cats)
  products: Product[];

  @JoinColumn()
  @OneToOne(() => CatDetail)
  catDetail: CatDetail;
}
