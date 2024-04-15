import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Department } from './department.entity';

@Entity('Job')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
  })
  name: string;

  // @ManyToOne(() => Department, (department) => department.jobs)
  // department: Department;

  @OneToMany(() => User, (user) => user.job)
  users: User[];

  @ManyToMany(() => Role)
  @JoinTable({ name: 'Role_Job' })
  roles: Role[];
}
