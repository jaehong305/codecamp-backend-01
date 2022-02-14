import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  personal: string;

  @Field(() => String)
  address: string;
}
