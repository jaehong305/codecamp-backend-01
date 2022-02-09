import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cat } from 'src/apis/cat/entities/cat.entity';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('increment') // uuid : 유니크아이디생성 / increment : 숫자증가생성
  @Field(() => Int)
  id: number;

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

  @ManyToMany(() => Cat, (cat) => cat.products)
  @Field(() => [Cat])
  cats: Cat[];
}
