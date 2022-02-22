import { Field, ObjectType } from '@nestjs/graphql';
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
@ObjectType()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ type: 'text' })
  @Field(() => String)
  intro: string;

  @JoinTable()
  @ManyToMany(() => Product, (products) => products.cats)
  @Field(() => [Product])
  products: Product[];

  @JoinColumn()
  @OneToOne(() => CatDetail)
  @Field(() => CatDetail)
  catDetail: CatDetail;
}
