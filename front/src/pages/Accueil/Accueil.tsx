import './style.scss';
import options from './constants';
import OptionButton from './OptionButton';

const Accueil = () => (
  <div className="accueil-body">
    <div className="container-accueil">
      <div className="header-content">
        <div className="title">Mes applications</div>
        <div className="label">
          Explorez la plateforme pour vous familiariser avec l&apos;outil.
          <br /> Naviguez sur la plateforme via les applications mise à votre disposition.
        </div>
      </div>
      <div className="body-content">
        {options.map((opt) => (
          <OptionButton title={opt.title} src={opt.src} path={opt.path} key={opt.path} />
        ))}
      </div>
    </div>
  </div>
);

export default Accueil;
