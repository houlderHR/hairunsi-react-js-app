import './style.scss';
import OptionButton from './OptionButton';
import { options } from './constants';

const Accueil = () => {
  return (
    <div className="accueil-body">
      <div className="container">
        <div className="header-content">
          <div className="title">Mes applications</div>
          <div className="label">
            Explorez la plateforme pour vous familiariser avec l'outil.
            <br /> Naviguez sur la plateforme via les applications mise à votre disposition.
          </div>
        </div>
        <div className="body-content">
          {!options ? (
            <div className="error-content">Pas d'option ! </div>
          ) : (
            options.map((opt, key) => {
              return <OptionButton title={opt.title} src={opt.src} path={opt.path} key={key} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
