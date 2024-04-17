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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
