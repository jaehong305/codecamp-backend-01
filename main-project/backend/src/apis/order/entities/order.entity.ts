import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  count: number;

  @Column({ default: 0 })
  @Field(() => Int)
  sum: number;

  @Column()
  @Field(() => String)
  address: string;

  // @Column()
  // isPay: boolean;

  // @Column({ type: 'timestamp' })
  // time: Date;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => User, { eager: true })
  @Field(() => User)
  user: User;
}
