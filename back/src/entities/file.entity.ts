import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('File')
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
}
