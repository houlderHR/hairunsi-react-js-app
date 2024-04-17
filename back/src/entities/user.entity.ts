import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

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

  @ManyToOne(() => Post, { nullable: false })
  @JoinColumn({
    name: 'id_post',
  })
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
