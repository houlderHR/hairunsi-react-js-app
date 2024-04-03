import { NavLink } from 'react-router-dom';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import Input from '../../shared/inputs/Input';
import InputIcon from '../../shared/inputs/InputIcon';

const ResetPassword = () => (
  <div className="grid md:grid-cols-[30%_70%] md:px-0 px-4 h-full min-h-screen">
    <div className="bg-primary h-full relative md:block hidden">
      <img
        src="images/background/bg-only-left.png"
        alt="background"
        className="absolute w-full h-full top-0 left-0 bg-cover right-0 bg-no-repeat"
      />
    </div>
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src="images/logo/logo-hairun-no-text.png"
          alt="logo-hairun-no-text"
          className="w-16 h-20 bg-cover bg-no-repeat"
        />
        <h3 className="text-black-1 text-3xl font-medium leading-9 mt-20">
          R&eacute;initialisation
        </h3>
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
        <div className="mt-12 flex flex-col gap-5 w-full">
          <Input placeholder="Adresse e-mail" type="text" />
          <InputIcon
            endIcon={<Icon name="eye" height={15} width={22} />}
            additionalClass="bg-transparent border rounded border-gray-1  text-base text-xl"
            additionalInputClass="text-base placeholder:text-gray-1 leading-3 py-4"
            placeholder="Mot de passe"
            type="password"
          />
          <button
            type="button"
            className="w-full bg-primary uppercase mt-10 text-white py-5 rounded text-sm leading-4 font-medium"
          >
            CONFIRMER
          </button>
        </div>
        <div className="mt-20 pt-7 border-t border-gray-5 text-black-1 px-11">
          <p className="text-sm leading-4">
            Vous avez d&eacute;ja un compte&nbsp;?&nbsp;
            <strong>
              <NavLink to={routes.unauthenticated.subpaths.login.path}>
                Conn&eacute;ctez-vous
              </NavLink>
            </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ResetPassword;
