import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CatDetail {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;
}
