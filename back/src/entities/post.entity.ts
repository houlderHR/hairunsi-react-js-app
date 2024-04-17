import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Department } from './department.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
  })
  name: string;

  @ManyToOne(() => Department, { nullable: false })
  @JoinColumn({
    name: 'id_department',
  })
  department: Department;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'Role_Job' })
  roles: Role[];
}
