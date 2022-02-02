import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Starbucks {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  kcal: number;

  @Field(() => Int)
  fat: number;

  @Field(() => Int)
  protein: number;

  @Field(() => Int)
  natrium: number;

  @Field(() => Int)
  sugar: number;

  @Field(() => Int)
  caffeine: number;
}
