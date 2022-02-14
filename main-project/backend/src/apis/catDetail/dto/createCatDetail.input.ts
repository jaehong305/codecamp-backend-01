import { InputType, OmitType } from '@nestjs/graphql';
import { CatDetail } from '../entities/catDetail.entity';

@InputType()
export class CreateCatDetailInput extends OmitType(
  CatDetail,
  ['id'],
  InputType,
) {}
