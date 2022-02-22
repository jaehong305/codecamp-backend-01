import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductImageInput {
  @Field(() => [String])
  urls: string[];

  @Field(() => [Boolean])
  isMains: boolean[];

  @Field(() => String)
  productId: string;
}
