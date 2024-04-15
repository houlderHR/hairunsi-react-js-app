import { IsDate, IsDateString, Length } from 'class-validator';

export class CreateOrUpdateRoleDto {
  @Length(4, 255, { message: 'Le nom doit avoir au minimum 4 caractères' })
  name: string;
  @IsDateString({}, { each: true })
  created_at: Date;
  @IsDateString({}, { each: true })
  updated_at: Date;
}
