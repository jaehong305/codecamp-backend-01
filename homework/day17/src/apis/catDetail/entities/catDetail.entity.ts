import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatDetail {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
