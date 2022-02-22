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
  name: string;

  @Column({ nullable: true })
  @Field(() => String)
  phone?: string;

  @Column({ nullable: true })
  @Field(() => String)
  personal?: string;

  @Column({ nullable: true })
  @Field(() => String)
  address?: string;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
