import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Boolean, { nullable: true })
  isWet?: boolean;
}
