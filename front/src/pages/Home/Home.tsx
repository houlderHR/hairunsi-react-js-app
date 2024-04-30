import './Home.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
import ButtonOutlined from '../../shared/buttons/ButtonOutlined';

const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="home-container h-screen w-full">
      <div className="relative w-full h-full bg-primary flex justify-center items-center justify-self-center">
        <div className="absolute md:w-1/3 text-center z-50 flex flex-col justify-center">
          <div className="flex justify-center items-center">
            <img
              src="images/logo/logo-hairun.png"
              className="logo flex justify-center items-center"
              alt=""
            />
          </div>
          <div className="mt-20 text-white">
            <h2 className="text-2xl xl:text-4xl font-bold xl:font-normal">
              <div>{t('welcome.hairunsi')}</div>
            </h2>
            <h3 className="mt-1 text-sm text-center xl:text-base px-12 sm:px-3.5 2xl:px-36">
              {t('plateform.manage.organisation')}
            </h3>
          </div>
          <div>
            <Link to={routes.unauthenticated.subpaths.login.path}>
              <ButtonOutlined title={t('start')} />
            </Link>
          </div>
        </div>
        <div className="absolute bg-cover z-20 inset-0 h-full w-full bg-no-repeat bg-svg" />
      </div>
    </div>
  );
};

export default Home;
