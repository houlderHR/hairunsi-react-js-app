import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Post } from './post.entity';
import { Role } from './role.entity';
import { File } from './file.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'matricule',
    type: 'varchar',
    generatedType: 'STORED',
  })
  matricule: string;

  @Column('varchar', {
    length: 255,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  lastname: string;

  @Column('timestamp')
  birth_date: Date;

  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'reset_password_token',
    length: 255,
    nullable: true,
  })
  resetPasswordToken: string;

  @OneToOne(() => File, (file) => file.id)
  @JoinColumn({
    name: 'id_file',
  })
  image: File;

  @ManyToOne(() => Post, { nullable: false })
  @JoinColumn({
    name: 'id_post',
  })
  post: Post;

  @ManyToOne(() => Role, { nullable: false })
  @JoinColumn({
    name: 'id_role',
  })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
