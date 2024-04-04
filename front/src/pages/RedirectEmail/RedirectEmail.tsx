import { FC } from 'react';
import Button from '../../shared/UserAuthenticationLayout/Button';

const RedirectEmail: FC = () => (
  <div className="w-full h-full min-h-screen flex items-center justify-center px-2 md:px-0 bg-gray-6">
    <div className="px-20 flex items-center flex-col rounded-lg shadow-lg bg-white pt-12 pb-20">
      <img
        src="images/logo/logo-hairun-large.png"
        alt="logo-hairun"
        className="bg-no-repeat bg-contain mb-[30px]"
      />
      <h3 className="text-2xl text-black-1 font-normal leading-7">Cher/Ch&egrave;re Tsanta,</h3>
      <p className="text-gray-1 leading-4 mt-[14px] text-sm text-center">
        Nous avons reçu une demande de r&eacute;initialisation
        <br /> du mot de passe pour votre compte HaiRun SI.
      </p>
      <Button>Reinitialiser</Button>
      <div className="mt-20 pt-7 border-t border-gray-5 text-black-1 px-11">
        <p className="text-sm text-center leading-4">
          Cordialement,
          <br /> L&apos;&eacute;quipe HaiRun Technology
        </p>
      </div>
    </div>
  </div>
);

export default RedirectEmail;
