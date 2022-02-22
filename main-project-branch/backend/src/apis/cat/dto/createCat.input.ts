import { Field, InputType } from '@nestjs/graphql';
import { CreateCatDetailInput } from 'src/apis/catDetail/dto/createCatDetail.input';

@InputType()
export class CreateCatInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  history: string;

  @Field(() => CreateCatDetailInput)
  catDetail: CreateCatDetailInput;
}
