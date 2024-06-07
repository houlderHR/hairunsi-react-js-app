import './style.scss';
import { useState } from 'react';
import HeadManager from '../../shared/authenticated/HeadManager';
import Icon from '../../shared/Icon';
import projects from './constants';
import Head from './Head';
import List from './List';
import CreateOrUpdateProject from './modals/CreateOrUpdateProject';
import Filter from './modals/Filter';

const Project = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const pushSearchProject = () => [];

  return (
    <div className="container-project">
      <div className="w-full h-auto flex flex-col justify-start items-center pt-14">
        <Head />
        <div className="content">
          <div className=" flex flex-row items-center w-full h-[46px] gap-x-4 sticky top-32 z-50">
            <div className="w-11/12">
              <HeadManager
                title="CREER UN NOUVEAU PROJET"
                onOpen={() => setShowCreateModal(true)}
                pushSearch={pushSearchProject}
              />
            </div>
            <div
              className="w-1/12 h-[56px] cursor-pointer"
              role="presentation"
              onClick={() => setShowFilterModal(true)}
            >
              <div className="flex flex-row justify-center items-center xl:flex xl:flex-row xl:items-center xl:justify-center w-full h-full bg-[#F9FAFB] hover:bg-gray-3 rounded-[2px] hover:bg-gray-50;">
                <Icon name="filter-2" width={24} height={24} className="text-[#808080]" />
                &nbsp;
                <div className="hidden 2xl:flex text-base font-normal text-[#808080]">Filtre</div>
              </div>
            </div>
          </div>
          <List projects={projects} />
        </div>
      </div>
      {showCreateModal && <CreateOrUpdateProject onClose={() => setShowCreateModal(false)} />}
      {showFilterModal && <Filter onClose={() => setShowFilterModal(false)} />}
    </div>
  );
};

export default Project;
