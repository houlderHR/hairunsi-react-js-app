import './style.css'
import projet from './../../assets/Vector(3).svg'
import utilisateur from './../../assets/Vector(2).svg'
import conge from './../../assets/Vector(1).svg'

import NavBar from '../../components/NavBar/NavBar'

const Accueil = () => {
    const options = [
        {
            src : projet,
            title : "Projets"
        },
        {
            src : utilisateur,
            title : "Gestion des utilisateurs"
        },
        {
            src : conge,
            title : "Congé"
        }
    ]
    return(
        <div className="col-start w-full h-screen">
            <NavBar/>
            <div className="col-center max-[639px]:transparent max-[639px]:flex max-[639px]:flex-col max-[639px]:h-screen max-[639px]:justify-center max-[639px]:space-y-20 bg-transparent lg:mt-20 md:mt-10 sm:h-screen sm-mt-0 sm:flex sm:flex-col sm:justify-around">
                <div className="flex flex-col justify-between items-center w-[513px] h-[111px] bg-transparent">
                    <div className="center w-[374px] h-[55px] font-500 lg:text-[48px] sm:text-[30px] md:text-[40px] md:font-500 max-[639px]:text-[30px] max-[639px]:font-500">
                        Mes applications
                    </div>
                    <div className="text-center whitespace-normal text-[#808080] w-auto h-auto lg:mt-5 md:mt-1 lg:text-[16px] sm:text-[12px] max-[639px]:text-[11px] max-[639px]:mt-0 break-all">
                        Explorer la plateforme pour vous familiariser avec l'outils.<br/> Naviguer sur la plateforme via les applications mise à votre disposition.
                    </div>
                </div>
                <div className="container-options">
                    { options.length ? 
                        options.map((opt) => 
                            {return (
                                <div className="col-center content-option">
                                    <img
                                        src={opt.src}
                                        alt="projet"
                                        className="w-[35.77px] h-[35.78px]"
                                    />
                                    <div className="center col-center pt-2 w-[64px] h-[14px] text-[12px] font-normal">
                                        {opt.title}
                                    </div>
                                </div>
                            )}
                        )
                    : ""}
                </div>
            </div>
        </div>
    )
}

export default Accueil;