import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Job } from './job.entity';

@Entity('Department')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
  })
  name: string;

  @OneToMany(() => Job, (job) => job.department)
  jobs?: Job[];
}
