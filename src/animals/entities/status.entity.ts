import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from './animal.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Animal, (animal) => animal.status)
  animals: Animal[];
}
