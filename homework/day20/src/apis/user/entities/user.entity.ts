import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  personal: string;

  @Column()
  @Field(() => String)
  address: string;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
