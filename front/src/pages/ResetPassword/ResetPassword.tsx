import { FC, useState } from 'react';
import Icon from '../../shared/Icon';
import Input from '../../shared/inputs/Input';
import InputIcon from '../../shared/inputs/InputIcon';
import UserAuthentication from '../../shared/UserAuthentication';
import Button from '../../shared/UserAuthentication/Button';

enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

const ResetPassword: FC = () => {
  const [inputType, setInputType] = useState<InputType>(InputType.PASSWORD);

  const toggleInputType = () => {
    if (inputType === InputType.TEXT) {
      setInputType(InputType.PASSWORD);
    } else {
      setInputType(InputType.TEXT);
    }
  };

  return (
    <UserAuthentication
      title="Créer un nouveau mot de passe"
      subTitle="Saisissez votre nouveau mot de passe pour accéder de nouveau à vote compte."
      contentTitle="Réinitialisation"
      showLogo
      showLoginLink
    >
      <p className="text-sm text-gray-1 font-medium leading-4">
        Entrez et confirmez votre nouveau mot de passe
      </p>
      <div className="text-sm font-medium leading-4 text-gray-1 mt-12">
        <h4>Afin de prot&eacute;ger votre compte, votre mot de passe doit :</h4>
        <ul className="list-disc mt-4 list-inside">
          <li>Au moins contenir 8 charact&egrave;res</li>
          <li>Contenir au moins une majuscule, un charactère sp&eacute;cial et un chiffre</li>
          <li>Ne pas contenir vos donn&eacute;es personnels</li>
        </ul>
      </div>
      <div className="mt-12 flex flex-col cursor-pointer gap-5 w-full">
        <Input placeholder="Adresse e-mail" type="text" />
        <InputIcon
          endIcon={
            <Icon
              name="eye"
              className="hover:text-secondary"
              onClick={toggleInputType}
              height={15}
              width={22}
            />
          }
          additionalClass="bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl"
          additionalInputClass="text-base placeholder:text-gray-1 leading-3 py-4 focus:placeholder:opacity-0 "
          placeholder="Mot de passe"
          type={inputType}
        />
        <Button>CONFIRMER</Button>
      </div>
    </UserAuthentication>
  );
};

export default ResetPassword;
