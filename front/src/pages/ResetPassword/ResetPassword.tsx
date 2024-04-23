import { FC, useState } from 'react';
import Icon from '../../shared/Icon';
import InputIcon from '../../shared/inputs/InputIcon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';
import InputType from '../../shared/UserAuthenticationLayout/constants';

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
    <UserAuthenticationLayout
      title="Créer un nouveau mot de passe"
      subTitle="Saisissez votre nouveau mot de passe pour accéder de nouveau à vote compte."
      contentTitle="Réinitialisation"
      showLogo
      showLoginLink
    >
      <p className="text-xs lg:text-sm text-gray-1 font-medium leading-4">
        Entrez et confirmez votre nouveau mot de passe
      </p>
      <div className="text-xs lg:text-sm font-medium leading-4 text-gray-1 mt-12">
        <h4>Afin de prot&eacute;ger votre compte, votre mot de passe doit :</h4>
        <ul className="list-disc mt-4 list-inside">
          <li>Au moins contenir 8 charact&egrave;res</li>
          <li>Contenir au moins une majuscule, un charactère sp&eacute;cial et un chiffre</li>
          <li>Ne pas contenir vos donn&eacute;es personnels</li>
        </ul>
      </div>
      <div className="mt-12 flex flex-col cursor-pointer gap-5 w-full">
        <InputIcon
          endIcon={
            <Icon
              name="eye"
              className="hover:text-secondary !h-3 lg:h-[15px]"
              onClick={toggleInputType}
              height={15}
              width={22}
            />
          }
          additionalClass="bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl pr-10"
          additionalInputClass="text-base text-sm 2xl:text-base !py-3 xl:!py-4 placeholder:text-gray-1 leading-3 py-4 focus:placeholder:opacity-0 "
          placeholder="Nouveau mot de passe"
          type={inputType}
        />
        <InputIcon
          endIcon={
            <Icon
              name="eye"
              className="hover:text-secondary !h-3 lg:h-[15px]"
              onClick={toggleInputType}
              height={15}
              width={22}
            />
          }
          additionalClass="bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl pr-10"
          additionalInputClass="text-base text-sm 2xl:text-base !py-3 xl:!py-4 placeholder:text-gray-1 leading-3 py-4 focus:placeholder:opacity-0 "
          placeholder="Confirmation du nouveau mot de passe"
          type={inputType}
        />
        <Button additionalClass=" ">CONFIRMER</Button>
      </div>
    </UserAuthenticationLayout>
  );
};

export default ResetPassword;
