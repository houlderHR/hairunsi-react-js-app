import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn('increment')
  matricule: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
