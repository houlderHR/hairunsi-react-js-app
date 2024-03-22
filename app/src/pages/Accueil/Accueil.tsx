import './style.scss'
import NavBar from '../../shared/authentificated/NavBar'
import OptionButton from './OptionButton/OptionButton'
import { options } from './constants'

const Accueil = () => {
    return(
        <div className="accueil-body">
            <NavBar/>
            <div className="container">
                <div className="header-content">
                    <div className="title">
                        Mes applications
                    </div>
                    <div className="label">
                        Explorer la plateforme pour vous familiariser avec l'outils.<br/> Naviguer sur la plateforme via les applications mise à votre disposition.
                    </div>
                </div>
                <div className="body-content">
                    { options.length ? 
                        options.map((opt) => 
                            {return (
                                <OptionButton title={opt.title} src={opt.src} />
                            )}
                        )
                    : ""}
                </div>
            </div>
        </div>
    )
}

export default Accueil;