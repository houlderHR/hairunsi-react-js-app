import { FC } from 'react';
import Icon from '../../../../../shared/Icon';
import formatDateToDDMonthYYYY from '../../../../../utils/formatDate';
import IProject from '../../../IProject';

interface HeaderProps {
  project: IProject;
  onUpdate?: () => void;
}

const Header: FC<HeaderProps> = ({ project, onUpdate }) => (
  <div className="bg-white px-5 lg:px-[28px] xl:px-[72px] py-1 lg:py-3 flex flex-wrap rounded-xl border border-white-1 w-full">
    <div className="flex gap-2 lg:gap-8 items-center w-full lg:w-1/3 py-[10px] lg:py-[23px]">
      <div className="h-20 w-20">
        <img className="object-contain" src={project.image} alt="" />
      </div>
      <div>
        <h2 className="text-xl text-primary font-medium leading-[22.98px]">{project.name}</h2>
        <p className="mt-[7px] relative text-secondary-2">
          <span className="before:content-['']  before:bg-secondary-2 before:w-[8.8px] before:h-[8.8px] before:absolute before:rotate-45 before:top-2">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.type}
          </span>
        </p>
        <p className="mt-[19px] leading-[13.79px] text-xs font-normal">
          <span className="text-black-1 mr-[8px] ">Date de création</span>
          <span className="text-gray-1">{formatDateToDDMonthYYYY(project.created_at)}</span>
        </p>
      </div>
    </div>
    <div className=" w-full lg:w-2/3">
      <div className="flex h-full items-center">
        <p className="text-gray-1  text-base font-normal leading-[18.38px]">
          {project.description}
        </p>
        <div className="h-full flex gap-6 items-center py-[13px]">
          <p className="w-px h-full bg-secondary-3 rounded-lg shadow-[rgba(0,0,15,0.5)_2px_0px_8px_0px]" />
          <Icon
            name="pen"
            className="cursor-pointer text-secondary-3 hover:text-secondary"
            onClick={onUpdate}
            height={32}
            width={32}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
