import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cat } from 'src/apis/cat/entities/cat.entity';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { SubCategory } from 'src/apis/subCategory/entities/subCategory.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column() // ({ type: 'text' })
  @Field(() => String)
  description: string;

  @Column() // ({ type: 'integer' })
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Boolean)
  isWet: boolean;
  // soldedAt: Date

  @Column()
  @Field(() => Int)
  quantity: number;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;

  @JoinTable()
  @ManyToMany(() => SubCategory, (subCategory) => subCategory.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => [SubCategory])
  subCategorys: SubCategory[];

  @ManyToMany(() => Cat, (cat) => cat.products)
  @Field(() => [Cat])
  cats: Cat[];
}
