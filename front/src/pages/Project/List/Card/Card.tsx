import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../../routes/paths';
import IProject from '../../IProject';

interface ICard {
  project: IProject;
  key?: string;
}

const Card: FC<ICard> = ({ project, key }) => {
  const [projectIsValid, setProjectIsValid] = useState(false);
  const [clientIsValid, setClientIsValid] = useState(false);

  const changingTypeProject = (type: string) => {
    if (type === 'Régie') return '/icon/regie.svg';
    if (type === 'Forfait') return '/icon/forfait.svg';
    if (type === 'Interne') return '/icon/interne.svg';
    return '';
  };

  useEffect(() => {
    const imgProject = new Image();
    const imgClient = new Image();
    imgProject.src = project.image || '';
    imgProject.onload = () => setProjectIsValid(true);
    imgProject.onerror = () => setProjectIsValid(false);
    imgClient.src = project.image || '';
    imgClient.onload = () => setClientIsValid(true);
    imgClient.onerror = () => setClientIsValid(false);
  }, [project]);

  return (
    <Link
      to={`${routes.authentified.subpaths.project.path}${routes.authentified.subpaths.project.subpaths.contact.path}`}
      key={key}
    >
      <div className="w-[380px] h-auto bg-white border-[#F0F0F0] hover:border-[#3E60C1] hover:cursor-pointer border-[1px] rounded-xl flex flex-col py-5 px-6 gap-y-5">
        <div className="w-full h-fit flex flex-col items-start gap-y-[10px] ">
          <div className="flex flex-row items-center gap-x-3">
            <div>
              <img
                src={projectIsValid ? project.image : '/images/logo/logo-hairun-no-text.png'}
                className="w-10 h-10 rounded-xl"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <div className="text-base  text-primary font-medium">{project.name}</div>
              <div className="flex flex-row gap-2 text-[#3E60C1] font-medium">
                <img src={changingTypeProject(project.type)} alt="regie" />
                <div>{project.type}</div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-[#808080] flex flex-row gap-2">
            <div className="font-medium">Date de création :</div>
            <div className="font-normal">{project.created_at.toLocaleString()}</div>
          </div>
        </div>
        <div className="text-xs font-normal text-[#808080] text-justify line-clamp-3">
          {project.description}
        </div>
        <div className="h-[26px] w-full  flex flex-row justify-between items-center">
          {project.responsible && (
            <div className="flex flex-row gap-[10px]">
              <img
                src={clientIsValid ? project.responsible?.image : '/icon/leave-icon.svg'}
                alt="responsible"
                className="w-7 h-7 rounded-full"
              />
              <div className="flex flex-col gap-0 justify-center items-start">
                <div className="text-xs font-medium text-[#2B335B]">{project.responsible.name}</div>
                <div className="text-[10px] font-normal text-[#CAC8FF]">
                  {project.responsible.post.name}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-row items-end">
            <div className="text-[#808080] text-xs font-medium">7</div>
            <div className="text-[#CAC8FF] text-xs font-normal">&nbsp;participants</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
