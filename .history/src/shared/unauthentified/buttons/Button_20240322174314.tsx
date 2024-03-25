import { Link } from 'react-router-dom';

const UnauthButton = (title:any) => {
  return (
    <div className="home-container h-screen w-screen">
       <button className="border border-white-300 rounded-md text-white uppercase mt-20 hover:cursor-pointer start-button">{title}</button>
    </div>
  );
}

export default UnauthButton;