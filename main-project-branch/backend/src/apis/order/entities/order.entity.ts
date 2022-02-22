import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PAYMENT_STATUS_ENUM {
  PENDING = 'PENDING',
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}
registerEnumType(PAYMENT_STATUS_ENUM, {
  name: 'PAYMENT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  count: number;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => String)
  address: string;

  @Column({ type: 'enum', enum: PAYMENT_STATUS_ENUM })
  @Field(() => PAYMENT_STATUS_ENUM)
  staus: PAYMENT_STATUS_ENUM;

  // @Column()
  // isPay: boolean;

  // @Column({ type: 'timestamp' })
  // time: Date;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
