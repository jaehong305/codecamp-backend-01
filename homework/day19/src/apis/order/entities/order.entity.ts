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
  amount: number;

  @Column()
  sum: number;

  @Column()
  address: string;

  @Column()
  isPay: boolean;

  @Column({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => User)
  user: User;
}
