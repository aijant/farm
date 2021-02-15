import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => Status, (status) => status.animals, {
    cascade: true,
  })
  status: Status[];
}
