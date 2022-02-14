import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (products) => products.subCategorys)
  @Field(() => [Product])
  products: Product[];
}
