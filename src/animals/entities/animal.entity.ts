import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column('json', { nullable: true })
  status: string[];
}
