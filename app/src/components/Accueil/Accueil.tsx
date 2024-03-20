import { lazy } from 'react';
const Header = lazy(() => import('./components/Header'))


const Accueil = () => {
    return(
        <div className='w-full h-screen'>
            <Header/>
        </div>
    )
}

export default Accueil;