import { Length } from 'class-validator';
import { Job } from '../../entities/job.entity';

export class UpdateDepartmentDto {
  @Length(4, 255, { message: 'Le nom doit etre superieur ou égal à 4' })
  name: string;

  jobs?: Job[];
}
