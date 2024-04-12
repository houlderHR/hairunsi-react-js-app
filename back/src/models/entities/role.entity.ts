import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Unique } from 'typeorm';
import { Job } from './job.entity';
import { Permission } from './permission.entity';

@Entity('Role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Job)
  jobs: Job[];

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'Permission_Role' })
  permissions: Permission[];
}
