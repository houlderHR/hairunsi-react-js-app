import { IsDefined, IsUUID, Length } from 'class-validator';
import { UUID } from 'crypto';

export class CreateAndUpdatePostDto {
  @Length(4, 255, { message: 'Vérifier la longueur de la valeur du champ [4-255].' })
  @IsDefined({ message: 'Vérifier que le champ existe bien.' })
  name: string;

  @IsUUID(undefined, { message: 'Veuillez inserer un departement valide' })
  department: UUID;
}
