import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Job } from './job.entity';
import { File } from './file.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
  })
  registration_number: string;

  @Column('varchar', {
    length: 255,
  })
  firstname: string;

  @Column('varchar', {
    length: 255,
  })
  lastname: string;

  @Column('timestamp')
  birthday: Date;

  @ManyToOne(() => Job, (job) => job.users)
  job: Job;

  @OneToOne(() => File)
  profile: File;
}
