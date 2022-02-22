import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  count: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  userId: string;
}
