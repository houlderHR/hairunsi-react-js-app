import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
