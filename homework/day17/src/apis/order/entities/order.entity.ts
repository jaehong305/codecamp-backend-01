import { Product } from 'src/apis/product/entities/product.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sum: number;

  @Column()
  address: string;

  @Column({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => User)
  user: User;
}
