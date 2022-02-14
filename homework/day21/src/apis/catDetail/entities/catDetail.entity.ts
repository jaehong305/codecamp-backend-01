import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CatDetail {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'text' })
  @Field(() => String)
  history: string;
}
