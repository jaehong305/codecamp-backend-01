import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  password!: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  personal?: string;

  @Field(() => String, { nullable: true })
  address?: string;
}
