import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
  })
  name: string;

  @Column('varchar', {
    length: 255,
  })
  path: string;

  @Column('varchar', {
    length: 255,
  })
  type: string;

  @Column('int')
  size: number;

  @Column('varchar', {
    length: 255,
  })
  public_id: string;

  @OneToOne(() => User, (user) => user.image, { onDelete: 'CASCADE' })
  user?: User;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;
}
