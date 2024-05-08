import { IsDefined, Length } from 'class-validator';

export class CreateAndUpdatePermissionDto {
  @Length(4, 255, { message: 'Vérifier la longueur de la valeur du champ [4-255].' })
  @IsDefined({ message: 'Vérifier que le champ existe bien.' })
  name: string;
}
